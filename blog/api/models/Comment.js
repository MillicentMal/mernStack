const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    postId:{
        type:String, 
        required: true
    }, 
    
    author:{
        type: String,
        required: true
    }, 
    text: {
        type: String
    },
    
    replies: {
        type: Array, 
        required: false

    }
},
    { timestamps: true}


);


module.exports = mongoose.model("Comment", CommentSchema);