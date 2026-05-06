// import mongoose from "mongoose";

// const storySchema = new mongoose.Schema({
//     user: { 
//         type: String, 
//         ref: 'User', 
//         required: true 
//     },

//     content: { 
//         type: String,
//     },

//     media: {type:String},

//     media_type:{type:String,enum:['text','image','video']},

//     views: [{ 
//         type: String, 
//         ref: 'User' 
//     }],

//     background_color : {type:String},


// }, { timestamps: true ,minimize:false});



// const Story = mongoose.model('Story', storySchema);

// export default Story;

import mongoose from "mongoose";

const storySchema = new mongoose.Schema({
    user: { 
        type: String, 
        ref: 'User', 
        required: true 
    },

    content: { 
        type: String,
        trim: true,
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
        type: String, 
        ref: 'User',
        default: []
    }],

    background_color: {
        type: String,
        default: ''
    },

    expiresAt: {
        type: Date,
        default: () => new Date(Date.now() + 24 * 60 * 60 * 1000)
    }

}, { 
    timestamps: true,
    minimize: false
});

storySchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });


// Prevent empty story
storySchema.pre('save', function (next) {
    if (
        this.media_type === 'text' && 
        !this.content && 
        !this.background_color
    ) {
        return next(new Error("Text story must have content or background color"));
    }

    if (
        (this.media_type === 'image' || this.media_type === 'video') &&
        !this.media
    ) {
        return next(new Error("Media is required for image/video story"));
    }

    next();
});

const Story = mongoose.model('Story', storySchema);

export default Story;