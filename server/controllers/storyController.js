import fs from 'fs';
import imagekit from '../configs/imagekit.js';
import Story from '../models/Story.js';
import User from '../models/User.js';
import { inngest } from '../inngest/index.js';

export const addUserStory = async (req, res) => {
    try {
        const userId = req.userId;
        const { content, media_type, background_color } = req.body;
        const file = req.file;

        let media_url = '';

        // handle image/video upload
        if (media_type === 'image' || media_type === 'video') {

            if (!file) {
                return res.status(400).json({
                    success: false,
                    message: "Media file is required"
                });
            }

            const response = await imagekit.files.upload({
                file: fs.createReadStream(file.path),
                fileName: file.originalname,
                folder: 'stories'
            });

            media_url = `${process.env.IMAGEKIT_URL_ENDPOINT}/${response.filePath}`;

            // delete local file
            if (fs.existsSync(file.path)) {
                await fs.promises.unlink(file.path);
            }
        }

        const story = await Story.create({
            user: userId,
            content,
            media: media_url,
            media_type,
            background_color
        });

        await inngest.send({
            name:'app/story.delete',
            data:{storyId:story._id}
        })

        res.json({
            success: true,
            message: "Story added successfully",
            story
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getUserStory = async (req,res) =>{
    try {
        
        const {userId} = req.auth();
        const user = await User.findById(userId)

        const userIds = [userId,...user.connections,...user.following]

        const stories = await Story.find({
            user:{$in:userIds}
        }).populate('user').sort({createdAt:-1});

        res.json({success:true,stories});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}