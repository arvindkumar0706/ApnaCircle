import { Inngest } from "inngest";
import User from "../models/User.js";
import Connection from "../models/Connection.js";
import sendEmail from "../configs/nodeMailer.js";
import Story from "../models/Story.js";
import Message from "../models/Message.js";

export const inngest = new Inngest({ id: "apnacircle-app" });

const syncUserCreation = inngest.createFunction(
  {
    id: "sync-user-from-clerk",
    triggers: [{ event: "clerk/user.created" }],
  },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    let username = email_addresses[0].email_address.split("@")[0];

    const user = await User.findOne({ username });

    if (user) {
      username = username + Math.floor(Math.random() * 10000);
    }

    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      full_name: first_name + " " + last_name,
      profile_picture: image_url,
      username,
    };

    await User.create(userData);
  }
);

const syncUserUpdation = inngest.createFunction(
  {
    id: "update-user-from-clerk",
    triggers: [{ event: "clerk/user.updated" }],
  },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    const updatedUserData = {
      email: email_addresses[0].email_address,
      full_name: first_name + " " + last_name,
      profile_picture: image_url,
    };

    await User.findByIdAndUpdate(id, updatedUserData);
  }
);

const syncUserDeletion = inngest.createFunction(
  {
    id: "delete-user-from-clerk",
    triggers: [{ event: "clerk/user.deleted" }],
  },
  async ({ event }) => {
    const { id } = event.data;

    await User.findByIdAndDelete(id);
  }
);

//Inngest Function to send Connection Request

const sendConnectionRequestReminder = inngest.createFunction(
  {
    id: 'send-new-connection-request-reminder',
    triggers: [{ event: 'app/connection-request' }],
  },
  async ({ event, step }) => {
    const { connectionId } = event.data;

    const getConnection = async () => {
      const connection = await Connection.findById(connectionId)
        .populate('from_user_id to_user_id');

      if (!connection) {
        throw new Error("Connection not found");
      }

      return connection;
    };

    const sendConnectionEmail = async (connection) => {
      const subject = `New Connection Request`;

      const body = `
      <div style="font-family: Arial, sans-serif; padding: 20px;"> 
        <h2>Hi ${connection.to_user_id.full_name},</h2>
        <p>You have a new connection request from 
        ${connection.from_user_id.full_name}@${connection.from_user_id.username}</p>
        <p>
          Click <a href="${process.env.FRONTEND_URL}/connections" style="color: #10b981;">
          here</a> to accept or reject the request
        </p>
        <br/>
        <p>Thanks,<br/>ApnaCircle - Stay Connected</p> 
      </div>`;

      await sendEmail({
        to: connection.to_user_id.email,
        subject,
        body,
      });
    };

    // ✅ First Email
    await step.run('send-initial-email', async () => {
      const connection = await getConnection();
      await sendConnectionEmail(connection);
    });

    // ⏳ Wait 24 hours
    const in24hours = new Date(Date.now() + 24 * 60 * 60 * 1000);
    await step.sleepUntil("wait-for-24-hours", in24hours);

    // 🔁 Reminder Email
    await step.run('send-reminder-email', async () => {
      const connection = await getConnection();

      if (connection.status !== 'pending') {
        return { message: "No reminder needed" };
      }

      await sendConnectionEmail(connection);

      return { message: "Reminder Sent" };
    });
  }
);

// Inngest func to delete stort after 24 hours

const deleteStory = inngest.createFunction(
  {
    id: 'story-delete',
    triggers: [{ event: 'app/story.delete' }],
  },
  async ({ event, step }) =>{
    const {storyId} = event.data;
    const in24hours = new Date(Date.now()+24*60*60*1000)
    await step.sleepUntil('wait-for-24hours',in24hours)
    await step.run("delete-story",async()=>{
      await Story.findByIdAndDelete(storyId)
      return {message:"Story Deleted"}
    })
  }
)

const sendNotificationOfUnseenMessages = inngest.createFunction(
  {
    id: 'send-unseen-messages-notification',
    triggers: [{ cron: 'TZ=Asia/Kolkata 0 9 * * *' }],
  },
  async ({ step }) => {

    const messages = await Message.find({ seen: false }).populate('to_user_id');

    const unseenCount = {};

    messages.forEach(message => {
      if (!message.to_user_id) return;

      const userId = message.to_user_id._id;
      unseenCount[userId] = (unseenCount[userId] || 0) + 1;
    });

    for (const userId in unseenCount) {

      const user = await User.findById(userId);
      if (!user) continue;

      const count = unseenCount[userId];

      const subject = `You have ${count} new unread message${count > 1 ? 's' : ''}`;

      const body = `...same as your HTML...`;

      await sendEmail({
        to: user.email,
        subject,
        body
      });
    }

    return { message: 'Notification Sent Successfully' };
  }
);

export const functions = [
  syncUserCreation,
  syncUserUpdation,
  syncUserDeletion,
  sendConnectionRequestReminder,
  deleteStory,
  sendNotificationOfUnseenMessages
];