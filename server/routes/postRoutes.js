import express from 'express';
import { upload } from '../configs/multer.js';
import { protect } from '../middleware/auth.js';
import { addPost, getPost, likePost } from '../controllers/postController.js';

const postRouter = express.Router();

postRouter.post('/add', protect, upload.array('media', 4), addPost);
postRouter.get('/feed', protect, getPost);
postRouter.post('/like', protect, likePost);

export default postRouter;