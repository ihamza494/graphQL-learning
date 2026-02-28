const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema({
    title: String,
    content: String
});

module.exports = mongoose.model("Video", VideoSchema);