const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    comment: String,
    commentTableId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    commentTableType: { 
        type: String,
        enum: ['Post', 'Video', 'Book'],
        required: true
    }
});

module.exports = mongoose.model("Comment", commentSchema);