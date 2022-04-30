const mongoose = require("mongoose");

const SubredditSchema = new mongoose.Schema({
    title:{
        type:String, 
        required: true, 
        unique: true
    }, 
    
},
    { timestamps: true}


);


module.exports = mongoose.model("Subreddit", SubredditSchema);