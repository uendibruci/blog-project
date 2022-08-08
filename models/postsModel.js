"use-strict";

const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Post title is required."],
  },
  content: {
    type: String,
    required: [true, "Post content is required."],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  Image: String,

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
});

postSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
  });
  next();
});

const Posts = mongoose.model("Posts", postSchema);

module.exports = Posts;
