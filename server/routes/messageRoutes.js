import express from 'express'
import { getChatMessages, sendMessage, sseController } from '../controllers/messageController.js'
import { upload } from '../configs/multer.js'
import { protect } from '../middleware/auth.js'

const messageRouter = express.Router()

messageRouter.get('/sse/:userId', sseController)

messageRouter.post(
    '/send',
    protect,
    upload.single('media'),
    sendMessage
)

messageRouter.get(
    '/get/:userId',
    protect,
    getChatMessages
)

export default messageRouter