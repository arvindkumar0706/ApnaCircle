import imagekit from '../configs/imagekit.js'
import Story from '../models/Story.js'
import User from '../models/User.js'
import { inngest } from '../inngest/index.js'

// Add Story
export const addUserStory = async (req, res) => {
    try {

        const userId = req.userId

        const {
            content,
            media_type,
            background_color
        } = req.body

        const file = req.file

        let media_url = ''

        // Upload image/video
        if (
            media_type === 'image' ||
            media_type === 'video'
        ) {

            if (!file) {
                return res.status(400).json({
                    success: false,
                    message: 'Media file is required'
                })
            }

            const response = await imagekit.files.upload({

                file: file.buffer.toString('base64'),

                fileName: file.originalname,

                folder: 'stories'
            })

            media_url =
                `${process.env.IMAGEKIT_URL_ENDPOINT}/${response.filePath}`
        }

        // Create story
        const story = await Story.create({

            user: String(userId),

            content,

            media: media_url,

            media_type,

            background_color
        })

        // Auto delete event
        await inngest.send({

            name: 'app/story.delete',

            data: {
                storyId: story._id
            }
        })

        res.status(201).json({

            success: true,

            message: 'Story created successfully',

            story
        })

    } catch (error) {

        console.log(error)

        res.status(500).json({

            success: false,

            message: error.message
        })
    }
}


// Get Stories
export const getUserStory = async (req, res) => {
    try {

        const userId = req.userId

        const user = await User.findById(userId)

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }

        const userIds = [
            userId,
            ...(user.connections || []),
            ...(user.following || [])
        ]

        const stories = await Story.find({
            user: { $in: userIds }
        })
            .populate('user')
            .sort({ createdAt: -1 })

        res.json({
            success: true,
            stories
        })

    } catch (error) {

        console.log(error)

        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}