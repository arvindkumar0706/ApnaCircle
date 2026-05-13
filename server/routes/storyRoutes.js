import express from 'express';
import { upload } from '../configs/multer.js';
import { protect } from '../middleware/auth.js';
import { addUserStory, getUserStory } from '../controllers/storyController.js';

const storyRouter = express.Router()

storyRouter.post(
    '/create',
    protect,
    upload.single('media'),
    addUserStory
)
storyRouter.get('/get',protect,getUserStory)

export default storyRouter