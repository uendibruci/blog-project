"use-strict";
const User = require("../models/userModel");

const catchAsync = require("../utils/catchAsync");
const signJWTToken = require("../utils/signJWTToken");
const AppError = require("../utils/appError");

exports.signin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("Please enter email and password.", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.checkPassword(password, user.password))) {
    return next(new AppError("Email or password is incorrect!!!", 401));
  }

  const token = signJWTToken(user.id);
  req.user = user;
  res.status(200).json({
    status: "success",
    token,
  });
});

exports.signup = catchAsync(async (req, res, next) => {
  const { firstname, lastname, email, password, passwordconfirm } = req.body;
  const userdata = {
    firstname,
    lastname,
    email,
    password,
    passwordconfirm,
  };

  const user = await User.create(userdata);
  if (!user) return next(new AppError("User could not be registered!", 400));

  token = signJWTToken(user.id);
  req.user = user;

  res.status(200).json({
    status: "success",
    token,
    user,
  });
});
