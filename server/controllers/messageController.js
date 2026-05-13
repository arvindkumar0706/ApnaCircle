import imagekit from "../configs/imagekit.js"
import Message from "../models/Message.js"

const connections = {}

// SSE connection

export const sseController = (req, res) => {

    try {

        const { userId } = req.params

        res.setHeader("Content-Type", "text/event-stream")
        res.setHeader("Cache-Control", "no-cache")
        res.setHeader("Connection", "keep-alive")
        res.setHeader("Access-Control-Allow-Origin", "*")

        connections[userId] = res

        res.write(`event: connected\ndata: connected\n\n`)

        req.on("close", () => {

            delete connections[userId]
        })

    } catch (error) {

        console.log(error)
    }
}


// Send message

export const sendMessage = async (req, res) => {

    try {

        const userId = req.userId

        const { to_user_id, text } = req.body

        const file = req.file

        let media_url = ""

        let message_type = "text"

        if (file) {

            if (file.mimetype.startsWith("image")) {

                message_type = "image"

            } else if (file.mimetype.startsWith("video")) {

                message_type = "video"

            } else {

                message_type = "document"
            }

            const response = await imagekit.files.upload({

                file: file.buffer.toString("base64"),

                fileName: file.originalname,

                folder: "/messages"
            })

            media_url = response.url
        }

        const message = await Message.create({

            from_user_id: userId,

            to_user_id,

            text,

            message_type,

            media_url
        })

        const messageWithUser = await Message.findById(message._id)
            .populate("from_user_id")

        if (connections[to_user_id]) {

            connections[to_user_id].write(
                `data: ${JSON.stringify(messageWithUser)}\n\n`
            )
        }

        res.status(200).json({

            success: true,

            message: messageWithUser
        })

    } catch (error) {

        console.log(error)

        res.status(500).json({

            success: false,

            message: error.message
        })
    }
}


// Get chat messages

export const getChatMessages = async (req, res) => {

    try {

        const userId = req.userId

        const { userId: to_user_id } = req.params

        const messages = await Message.find({

            $or: [

                {
                    from_user_id: userId,
                    to_user_id
                },

                {
                    from_user_id: to_user_id,
                    to_user_id: userId
                }
            ]
        }).sort({ createdAt: 1 })

        await Message.updateMany(

            {
                from_user_id: to_user_id,
                to_user_id: userId
            },

            {
                seen: true
            }
        )

        res.status(200).json({

            success: true,

            messages
        })

    } catch (error) {

        console.log(error)

        res.status(500).json({

            success: false,

            message: error.message
        })
    }
}

// Get recent chats

export const getRecentChatMessages = async (req, res) => {

    try {

        const {userId} = req.auth()
        const messages = await Message.find({to_user_id:userId}).populate('from_user_id to_user_id').sort({created_at:-1});

        res.json({success:true,messages})
    } catch (error) {
        res.json({success:true,messages})

    }
}