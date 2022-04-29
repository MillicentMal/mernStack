const mongoose = require("mongoose");
const Post = mongoose.model(
  "Post",
  new mongoose.Schema({
    title: String,
    author: String,
    subreddit: String,
    text: String,
    upvotes: Number,
    downvotes: Number, 
    createdAt: Date,
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
      }
    ]
  })
);
module.exports = Post;