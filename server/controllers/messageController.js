import fs from 'fs';
import imagekit from '../configs/imagekit.js';
import Message from '../models/Message.js';

const connections = {};

// SSE Controller
export const sseController = (req, res) => {
    const { userId } = req.params;

    console.log('New client connected:', userId);

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Access-Control-Allow-Origin', '*');

    connections[userId] = res;

    res.write('event: connected\ndata: Connected to SSE\n\n');

    req.on('close', () => {
        delete connections[userId];
        console.log('Client disconnected:', userId);
    });
};


// Send Message
export const sendMessage = async (req, res) => {
    try {
        const userId = req.userId;
        const { to_user_id, text } = req.body;
        const file = req.file;

        let media_url = '';
        let message_type = 'text';

        if (file) {
            const isVideo = file.mimetype.startsWith('video');
            message_type = isVideo ? 'video' : 'image';

            const response = await imagekit.files.upload({
                file: fs.createReadStream(file.path),
                fileName: file.originalname,
                folder: 'messages'
            });

            if (isVideo) {
                media_url = `${process.env.IMAGEKIT_URL_ENDPOINT}/${response.filePath}`;
            } else {
                media_url = imagekit.helper.buildSrc({
                    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
                    src: response.filePath,
                    transformation: [
                        { width: 1280 },
                        { quality: "auto" },
                        { format: "webp" }
                    ]
                });
            }

            // delete temp file
            if (fs.existsSync(file.path)) {
                await fs.promises.unlink(file.path);
            }
        }

        const message = await Message.create({
            from_user_id: userId,
            to_user_id,
            text,
            message_type,
            media_url
        });

        res.json({ success: true, message });

        // populate sender data
        const messageWithUser = await Message.findById(message._id)
            .populate('from_user_id');

        // send via SSE if receiver connected
        if (connections[to_user_id]) {
            connections[to_user_id].write(
                `data: ${JSON.stringify(messageWithUser)}\n\n`
            );
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Get Chat Messages

export const getChatMessages = async (res,req)=>{
    try {

        const {userId} = req.auth();
        const {to_user_id} = req.body()

        const messages = await Message.find({
            $or:[
                {from_user_id:userId,to_user_id},
                {from_user_id:to_user_id,to_user_id:userId},
            ]
        }).sort({created_at:-1})

        await Message.updateMany({from_user_id:to_user_id,to_user_id:userId},{seen:true})

        res.json({success:true,messages});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


export const getRecentChatMessages = async (res,req)=>{
    try {

        const {userId} = req.auth();
        const messages = await Message.find({to_user_id:userId}.populate('from_user_id to_user_id')).sort({created_at:-1});

        res.status(500).json({success: true,messages});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

