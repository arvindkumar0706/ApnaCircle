import fs from 'fs';
import imagekit from '../configs/imagekit.js';
import Post from '../models/Post.js';
import User from '../models/User.js';

// Add Post
export const addPost = async (req, res) => {
    try {
        const userId = req.userId;
        const { content, post_type } = req.body;
        const files = req.files || [];

        let media = [];

        if (files.length > 0) {
            media = await Promise.all(
                files.map(async (file) => {
                    try {
                        // upload using stream (important for image + video)
                        const response = await imagekit.files.upload({
                            file: fs.createReadStream(file.path),
                            fileName: file.originalname,
                            folder: 'posts'
                        });

                        const isVideo = file.mimetype.startsWith('video');

                        let fileUrl;

                        if (isVideo) {
                            fileUrl = `${process.env.IMAGEKIT_URL_ENDPOINT}/${response.filePath}`;
                        } else {
                            fileUrl = imagekit.helper.buildSrc({
                                urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
                                src: response.filePath,
                                transformation: [
                                    {
                                        width: 1280,
                                        quality: "auto",
                                        format: "webp",
                                    },
                                ],
                            });
                        }

                        // delete local file after upload
                        if (fs.existsSync(file.path)) {
                            await fs.promises.unlink(file.path);
                        }

                        return {
                            url: fileUrl,
                            type: isVideo ? 'video' : 'image'
                        };

                    } catch (err) {
                        // cleanup on failure
                        if (fs.existsSync(file.path)) {
                            await fs.promises.unlink(file.path);
                        }
                        throw err;
                    }
                })
            );
        }

        const newPost = await Post.create({
            user: userId,
            content,
            media,
            post_type
        });

        res.status(201).json({
            success: true,
            message: 'Post created successfully',
            post: newPost
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Get Posts (Feed)
export const getPost = async (req, res) => {
    try {
        const userId = req.userId;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const userIds = [
            userId,
            ...(user.connections || []),
            ...(user.following || [])
        ];

        const posts = await Post.find({ user: { $in: userIds } })
            .populate('user')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            posts
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Like / Unlike Post
export const likePost = async (req, res) => {
    try {
        const userId = req.userId;
        const { postId } = req.body;

        if (!postId) {
            return res.status(400).json({
                success: false,
                message: "Post ID is required"
            });
        }

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        if (!post.likes) post.likes = [];

        const alreadyLiked = post.likes.includes(userId);

        if (alreadyLiked) {
            post.likes = post.likes.filter(id => id !== userId);
            await post.save();

            return res.json({
                success: true,
                message: 'Post unliked'
            });
        } else {
            post.likes.push(userId);
            await post.save();

            return res.json({
                success: true,
                message: 'Post liked'
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};