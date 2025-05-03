const mongoose = require("mongoose");  

const postShema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
},{
    timestamps: true,   
})

const Post = mongoose.model("Post", postShema)
module.exports =  Post