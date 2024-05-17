const User = require("../Models/UserModel");
const asyncHandler = require("express-async-handler");
const { sendingToMail } = require("../Utils/Utils");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const Token = require("../Models/TokenModel");
require("dotenv").config();

exports.signUp = asyncHandler(async (req, res) => {
  try {
    const user = await User.create(req.body);

    let mailDetails = {
      from: "jobSpot.app@gmail.com",
      to: user.email,
      subject: "JobSpot Registeration",
      text: "Your successfully registered in JobSpot App",
    };
    sendingToMail(mailDetails);
    res
      .status(201)
      .json({ success: true, message: "You are successfully registered" });
  } catch (error) {
    if (error.code === 11000) {
      const patternKey = Object.keys(error.keyPattern)[0];
      console.log(patternKey);
      res.status(403).json({
        success: false,
        message: `The ${patternKey} is already in use.`,
      });
    } else {
      res.status(403).json({
        success: false,
        message: error.name,
      });
    }
  }
});

exports.signIn = asyncHandler(async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      const token = await user.jwtSignUp();
      res.status(200).json({ success: true, jwtToken: token });
    } else {
      res.status(404).json({ success: false, message: "User does not exist" });
    }
  } catch (error) {
    res.status(403).json({ success: false, message: error.name });
  }
});

exports.resetPassword = asyncHandler(async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    const clientHost = req.headers["client-host"];
    const clientProtocol = req.headers["client-protocol"];

    if (user) {
      let token = await Token.findOne({ userId: user._id });
      if (!token) {
        token = await Token({
          userId: user._id,
          token: crypto.randomBytes(32).toString("hex"),
        }).save();
      }

      const resetURL = `${clientProtocol}//${clientHost}/reset/${user._id}/${token.token}`;

      let mailDetails = {
        from: "jobhunt.app@gmail.com",
        to: user.email,
        subject: "JobSpot Password Reset",
        html: `
                 <p>You requested for password reset</p>
                 <h5>click in this <a href="${resetURL}">link</a> to reset password</h5>
                 `,
      };
      sendingToMail(mailDetails);
      res
        .status(200)
        .json({ success: true, message: "Please check your mail" });
    } else {
      res.status(404).json({ success: false, message: "User does not exist" });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.name,
    });
  }
});

exports.newPassword = asyncHandler(async (req, res) => {
  try {
    let user = await User.findById(req.params.userId);

    if (!user) {
      res
        .status(400)
        .json({ success: false, message: "User does not match with user id" });
    } else {
      const token = await Token.findOne({
        userId: user._id,
        token: req.params.token,
      });

      if (!token) {
        res.status(400).json({
          success: false,
          message: "The Link has been invalid or expired",
        });
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        await User.updateOne(
          { _id: user._id },
          { $set: { password: hashedPassword } }
        );
        await token.deleteOne();

        res.status(201).json({
          success: true,
          message: "Your Password has been reset successfully.",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.name,
    });
  }
});

exports.changePassword = asyncHandler(async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId);

    const isMatch = await user.matchPassword(req.body.password);
    if (!isMatch) {
      res
        .status(404)
        .json({ success: false, message: "You are entered wrong password." });
    }
    const salt = await bcrypt.genSalt(10);
    const passwordNew = await bcrypt.hash(req.body.newPassword, salt);

    await User.findByIdAndUpdate({ _id: userId }, { password: passwordNew });

    res.status(200).json({
      success: true,
      message: "Your password has been successfully changed.",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.name,
    });
  }
});
