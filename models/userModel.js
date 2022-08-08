"use-strict";

const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "Post title is required."],
      trim: true,
    },
    lastname: {
      type: String,
      required: [true, "Post content is required."],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Post content is required."],
      unique: true,
      validate: [
        validator.isEmail,
        "Please enter an email in the correct format",
      ],
    },
    registeredAt: {
      type: Date,
      default: Date.now(),
    },
    password: {
      type: String,
      required: [true, "Please enter password"],
      minlength: 8,
      select: false,
    },

    passwordconfirm: {
      type: String,
      required: [true, "Please confirm password"],
      validate: {
        validator: function (passwordconfirm) {
          return passwordconfirm === this.password;
        },

        message: "Passwords do not match",
      },
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.virtual("username").get(function () {
  return this.firstname + " " + this.lastname;
});

userSchema.virtual("posts", {
  ref: "Posts",
  foreignField: "user",
  localField: "_id",
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordconfirm = undefined;
  next();
});

userSchema.methods.checkPassword = async function (
  candidatePassword,
  password
) {
  return await bcrypt.compareSync(candidatePassword, password);
};

const Users = mongoose.model("Users", userSchema);

module.exports = Users;
