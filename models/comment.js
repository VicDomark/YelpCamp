var mongoose = require("mongoose");
    //SCHEMA SET UP

var commentSchema = new mongoose.Schema({
    text: String,
    author: String
});

module.exports = mongoose.model("Comment", commentSchema);