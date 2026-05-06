import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    user: { 
        type: String, 
        ref: 'User', 
        required: true 
    },

    content: { 
        type: String,
        trim: true 
    },

    media: [
        {
            url: { type: String, required: true },
            type: { 
                type: String, 
                enum: ['image', 'video'], 
                required: true 
            }
        }
    ],

    post_type: {
        type: String,
        enum: ['text', 'image', 'video', 'mixed'],
        required: true
    },

    likes: [{ 
        type: String, 
        ref: 'User' 
    }]

}, { 
    timestamps: true,
    minimize: false 
});

const Post = mongoose.model('Post', postSchema);

export default Post;