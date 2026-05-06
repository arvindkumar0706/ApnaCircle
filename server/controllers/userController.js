import imagekit from "../configs/imagekit.js";
import { inngest } from "../inngest/index.js";
import Connection from "../models/Connection.js";
import Post from "../models/Post.js";
import User from "../models/User.js";
import fs from "fs";

// Get user data
export const getUserData = async (req, res) => {
    try {
        const userId = req.userId;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User Not Found" });
        }

        res.json({ success: true, user });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};


// Update user data
export const updateUserData = async (req, res) => {
    try {
        const userId = req.userId;

        let { username, bio, location, full_name } = req.body;

        const tempUser = await User.findById(userId);
        if (!tempUser) {
            return res.status(404).json({ success: false, message: "User Not Found" });
        }

        if (!username) username = tempUser.username;

        if (tempUser.username !== username) {
            const existingUser = await User.findOne({ username });
            if (existingUser) username = tempUser.username;
        }

        const updatedData = { username, bio, location, full_name };

        const profile = req.files?.profile?.[0];
        const cover = req.files?.cover?.[0];

        if (profile) {
            const response = await imagekit.files.upload({
                file: fs.createReadStream(profile.path),
                fileName: profile.originalname,
            });

            updatedData.profile_picture = imagekit.helper.buildSrc({
                urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
                src: response.filePath,
                transformation: [{ width: 512, quality: "auto", format: "webp" }],
            });

            if (fs.existsSync(profile.path)) await fs.promises.unlink(profile.path);
        }

        if (cover) {
            const response = await imagekit.files.upload({
                file: fs.createReadStream(cover.path),
                fileName: cover.originalname,
            });

            updatedData.cover_photo = imagekit.helper.buildSrc({
                urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
                src: response.filePath,
                transformation: [{ width: 1280, quality: "auto", format: "webp" }],
            });

            if (fs.existsSync(cover.path)) await fs.promises.unlink(cover.path);
        }

        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });

        res.json({ success: true, user: updatedUser });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};


// Discover users
export const discoverUsers = async (req, res) => {
    try {
        const userId = req.userId;
        const { input = "" } = req.body;

        const users = await User.find({
            $or: [
                { username: { $regex: input, $options: "i" } },
                { email: { $regex: input, $options: "i" } },
                { full_name: { $regex: input, $options: "i" } },
                { location: { $regex: input, $options: "i" } },
            ],
        });

        const filteredUsers = users.filter(
            (u) => u._id.toString() !== userId
        );

        res.json({ success: true, users: filteredUsers });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};


// Follow user
export const followUser = async (req, res) => {
    try {
        const userId = req.userId;
        const { id } = req.body;

        if (userId === id) {
            return res.json({ success: false, message: "You cannot follow yourself" });
        }

        const user = await User.findById(userId);
        const toUser = await User.findById(id);

        if (!toUser) {
            return res.json({ success: false, message: "User not found" });
        }

        if (user.following.includes(id)) {
            return res.json({ success: false, message: "Already following" });
        }

        user.following.push(id);
        toUser.followers.push(userId);

        await user.save();
        await toUser.save();

        res.json({ success: true, message: "Followed successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};


// Unfollow user
export const unfollowUser = async (req, res) => {
    try {
        const userId = req.userId;
        const { id } = req.body;

        const user = await User.findById(userId);
        const toUser = await User.findById(id);

        if (!toUser) {
            return res.json({ success: false, message: "User not found" });
        }

        user.following = user.following.filter(
            (u) => u.toString() !== id
        );

        toUser.followers = toUser.followers.filter(
            (u) => u.toString() !== userId
        );

        await user.save();
        await toUser.save();

        res.json({ success: true, message: "Unfollowed successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};


// Send Connection Request
export const sendConnectionRequest = async (req, res) => {
    try {
        const userId = req.userId;
        const { id } = req.body;

        const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);

        const connectionReq = await Connection.find({
            from_user_id: userId,
            createdAt: { $gt: last24Hours }
        });

        if (connectionReq.length >= 20) {
            return res.json({ success: false, message: 'Limit reached' });
        }

        const connection = await Connection.findOne({
            $or: [
                { from_user_id: userId, to_user_id: id },
                { from_user_id: id, to_user_id: userId },
            ]
        });

        if (!connection) {
            const newConnection =  await Connection.create({
                from_user_id: userId,
                to_user_id: id
            });

            await inngest.send({
                name:'app/connection-request',
                data:{connectionId : newConnection._id}
            })

            return res.json({ success: true, message: 'Request sent successfully' });
        }

        if (connection.status === 'accepted') {
            return res.json({ success: false, message: 'Already connected' });
        }

        return res.json({ success: false, message: 'Request pending' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};


// Get User Connections
export const getUserConnections = async (req, res) => {
    try {
        const userId = req.userId;

        const user = await User.findById(userId).populate('connections followers following');

        const pendingConnections = (
            await Connection.find({ to_user_id: userId, status: 'pending' })
                .populate('from_user_id')
        ).map(c => c.from_user_id);

        res.json({
            success: true,
            connections: user.connections,
            followers: user.followers,
            following: user.following,
            pendingConnections
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};


// Accept Connection Request
export const acceptConnections = async (req, res) => {
    try {
        const userId = req.userId;
        const { id } = req.body;

        const connection = await Connection.findOne({
            from_user_id: id,
            to_user_id: userId
        });

        if (!connection) {
            return res.json({ success: false, message: 'Connection not found' });
        }

        const user = await User.findById(userId);
        const toUser = await User.findById(id);

        user.connections.push(id);
        toUser.connections.push(userId);

        await user.save();
        await toUser.save();

        connection.status = 'accepted';
        await connection.save();

        res.json({ success: true, message: 'Connection accepted successfully' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get User Profile

export const getUserProfiles = async (res,req)=>{
    try {
        const {profileId} = req.body;
        const profile  = await User.findById(profileId)
        if(!profile){
            return res.json({success:false,message:'Profile not found'})
        }
        const posts = await Post.find({user:profileId}).populate('user')

        res.json({success:true,profile,posts})

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}