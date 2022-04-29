// Requiring module
const mongoose = require('mongoose');

// Course Modal Schema

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    password: String,
    subreddits: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subreddit"
          }
    ],
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
      }],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
      }
    ]
  })
);

module.exports = {
	User
}
