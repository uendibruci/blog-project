"use-strict";
const User = require("../models/userModel");
const Posts = require("../models/postsModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find().populate("posts");
  res.status(200).json({
    status: "success",
    results: users.length,
    users,
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const currentUser = await User.findById(req.params.id).populate("posts");

  if (!currentUser) {
    return next(new AppError("No user found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    user: currentUser,
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  if (req.body.password || req.body.passwordConfirm || req.body.email) {
    return next(new AppError("You cannot update email or password!", 400));
  }

  const updatedUser = await User.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  console.log(updatedUser);

  res.status(200).json({
    status: "success",
    user: updatedUser,
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findById(id);

  await Posts.deleteMany({
    _id: {
      $in: user.posts,
    },
  });
  // user.posts &&
  //   user.posts.map(async (post) => {
  //     await Posts.findByIdAndDelete(post._id);
  //     console.log(post);
  //   });

  await User.findByIdAndDelete(id);
  await res.status(204).json({
    status: "success",
    user: null,
  });
});
