const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const secretKey = process.env.SECRET_KEY;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    match: /@gmail.com$/,
  },

  password: {
    type: String,
    required: true,
    minlength: 6,
  },

  role: {
    type: String,
    default: "user",
  },

  createdBy: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.jwtSignUp = function () {
  return jwt.sign(
    {
      id: this._id,
      role: this.role,
      name: this.username,
      user_email: this.email,
    },
    secretKey,
    { expiresIn: "1h" }
  );
};

const User = mongoose.model("user", userSchema);

module.exports = User;
