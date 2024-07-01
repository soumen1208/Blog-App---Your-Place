const mongoose = require('mongoose');

commentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    commentText: {
        type: String,
        required: [true, "commentText is required"]
    },
    blogId: {
        type: String,
        required: [true, "Email is required"]
    },

}, { timestamps: true })

module.exports = mongoose.model('Comment', commentSchema)