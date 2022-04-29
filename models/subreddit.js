const mongoose = require("mongoose");
const Subreddit = mongoose.model(
  "Subreddit",
  new mongoose.Schema({
    name: String,
    description: String
  })
);
module.exports = Subreddit;