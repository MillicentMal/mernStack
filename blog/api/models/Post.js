const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    title:{
        type:String, 
        required: true, 
        unique: true
    }, 
    text: {
        type: String
    },
    photo:{
        type:String, 
        required:false, 
    },
    author:{
        type: String,
        required: true
    }, 
    subreddit:{
        type: String,
        required: false
    }, 
    comments: {
        type: Array, 
        required: false

    }, 
    upvotes: {
        type: Number
    }, 
    downvotes: {
        type: Number
    }
},
    { timestamps: true}


);


module.exports = mongoose.model("Post", PostSchema);