import mongoose from "mongoose";

const storySchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.String,
        ref: 'User',
        required: true
    },

    content: {
        type: String,
        default: ''
    },

    media: {
        type: String,
        default: ''
    },

    media_type: {
        type: String,
        enum: ['text', 'image', 'video'],
        required: true
    },

    views: [{
        type: mongoose.Schema.Types.String,
        ref: 'User'
    }],

    background_color: {
        type: String,
        default: ''
    }

}, {
    timestamps: true,
    minimize: false
});

const Story = mongoose.model('Story', storySchema);

export default Story;