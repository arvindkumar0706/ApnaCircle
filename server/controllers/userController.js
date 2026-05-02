import imagekit from "../configs/imagekit.js";
import Connection from "../models/Connection.js";
import User from "../models/User.js";
import fs from "fs";

// Get user data
export const getUserData = async (req, res) => {
    try {
        const { userId } = req.auth();

        const user = await User.findById(userId);

        if (!user) {
            return res.json({ success: false, message: "User Not Found" });
        }

        res.json({ success: true, user });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


// Update user data
export const updateUserData = async (req, res) => {
    try {
        const { userId } = req.auth();

        let { username, bio, location, full_name } = req.body;

        const tempUser = await User.findById(userId);

        if (!tempUser) {
            return res.json({ success: false, message: "User Not Found" });
        }

        if (!username) {
            username = tempUser.username;
        }

        if (tempUser.username !== username) {
            const existingUser = await User.findOne({ username });
            if (existingUser) {
                username = tempUser.username;
            }
        }

        const updatedData = {
            username,
            bio,
            location,
            full_name,
        };

        const profile = req.files?.profile?.[0];
        const cover = req.files?.cover?.[0];

        // Profile image upload + transformation
        if (profile) {
            const response = await imagekit.files.upload({
                file: fs.createReadStream(profile.path),
                fileName: profile.originalname,
            });

            const transformedUrl = imagekit.helper.buildSrc({
                urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
                src: response.filePath,
                transformation: [
                    {
                        width: 512,
                        quality: 80,
                        format: "webp",
                    },
                ],
            });

            updatedData.profile_picture = transformedUrl;

            fs.unlinkSync(profile.path);
        }

        // Cover image upload + transformation
        if (cover) {
            const response = await imagekit.files.upload({
                file: fs.createReadStream(cover.path),
                fileName: cover.originalname,
            });

            const transformedUrl = imagekit.helper.buildSrc({
                urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
                src: response.filePath,
                transformation: [
                    {
                        width: 1280,
                        quality: 80,
                        format: "webp",
                    },
                ],
            });

            updatedData.cover_photo = transformedUrl;

            fs.unlinkSync(cover.path);
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updatedData,
            { new: true }
        );

        res.json({ success: true, user: updatedUser });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


// Discover users
export const discoverUsers = async (req, res) => {
    try {
        const { userId } = req.auth();
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
        res.json({ success: false, message: error.message });
    }
};


// Follow user
export const followUser = async (req, res) => {
    try {
        const { userId } = req.auth();
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
        res.json({ success: false, message: error.message });
    }
};


// Unfollow user
export const unfollowUser = async (req, res) => {
    try {
        const { userId } = req.auth();
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
        res.json({ success: false, message: error.message });
    }
};

// Connection Request

export const sendConnectionRequest = async(req,res)=>{
    try {
        const {userId} = req.auth()
        const {id} = req.body;

        const last24Hours = new Date(Date.now() - 24*60*60*1000)
        const connectionReq = await Connection.find({from_user_id:userId,createdAt:{$gt:last24Hours}})

        if (connectionReq.length >= 20) {
            return res.json({success:false,message:'You have sent more than 20 connection requests in the last 24 hours'})
        }

        const connection = await Connection.findOne({
            $or : [
                {rom_user_id:userId,to_user_id:id},
                {rom_user_id:id,to_user_id:userId},
            ]
        })

        if (!connection) {
            await Connection.create({
                from_user_id:userId,
                to_user_id:id
            })
            return res.json({success:true,message:'Connection request sent successfully'})
        }else if (connection && connection.status === 'accepted') {
            return res.json({success:false,message:'You are already connected with this user'})
        }

        return res.json({success:false,message:'Connection request pending'})

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Get User Connections

export const getUserConnections = async(req,res)=>{
    try {
        const {userId} = req.auth()
        const user  = await User.findById(userId).populate('connections followers following')
        const connections=user.connections
        const followers=user.followers
        const following=user.following

        const pendingConnections = (await Connection.find({to_user_id:userId,status:'pending'}).populate('from_user_id')).map(connection=>connection.from_user_id)

        res.json({success:true,connections,followers,following,pendingConnections})

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

//Accept Connection Request

export const acceptConnections = async(req,res)=>{
    try {
        const {userId} = req.auth()
        const {id} = req.body;

        const connection = await Connection.findOne({from_user_id:id,to_user_id:userId})

        if (!connection) {
            return res.json({success:false,message:'Connection not found'})
        }

        const user = await User.findById(userId);
        user.connections.push(id);
        await user.save()

        const toUser = await User.findById(id);
        toUser.connections.push(userId);
        await toUser.save()

        connection.status = 'accepted';
        await connection.save()

        res.json({success:true,message:'Connection accepted Successfully'})

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}