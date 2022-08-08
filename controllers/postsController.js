"use-strict";
const Posts = require("../models/postsModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllPosts = catchAsync(async (req, res, next) => {
  const posts = await Posts.find().sort({ createdAt: -1 });
  res.status(200).json({
    status: "success",
    results: posts.length,
    posts,
  });
});

exports.getPost = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const post = await Posts.findById(id);
  res.status(200).json({
    status: "success",
    post,
  });
});

exports.createPost = catchAsync(async (req, res, next) => {
  const createdPost = await Posts.create(req.body);
  res.status(201).json({
    status: "success",
    post: createdPost,
  });
});

exports.updatePost = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const updatedPost = await Posts.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  }).populate("user");
  res.status(200).json({
    status: "success",
    post: updatedPost,
  });
});

exports.deletePost = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  await Posts.findByIdAndDelete(id);
  res.status(204).json({
    status: "success",
    data: null,
  });
});
