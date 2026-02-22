const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
    title: String,
    authorId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Author"
    }
});

module.exports = mongoose.model("Book", BookSchema);