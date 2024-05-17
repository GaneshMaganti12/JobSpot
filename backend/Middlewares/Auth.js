const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.SECRET_KEY;

exports.isAuthenticated = async (req, res, next) => {
  const user = await User.findOne({ username: req.body.username });
  if (user) {
    const isMatch = await user.matchPassword(req.body.password);
    if (isMatch) {
      next();
    } else {
      res
        .status(403)
        .json({ success: false, message: "You are entered wrong password" });
    }
  } else {
    res.status(403).json({ success: false, message: "User does not exist" });
  }
};

exports.isAuthorized = (req, res, next) => {
  const token = req.headers["authorization"];

  if (token) {
    const jwtToken = token.split(" ");
    const decodeToken = jwt.verify(jwtToken[1], secretKey);
    if (decodeToken) {
      req.id = decodeToken.id;
      req.role = decodeToken.role;
      req.userEmail = decodeToken.user_email;
      next();
    } else {
      res.json({ success: false, message: "You are not authorized" });
    }
  } else {
    res.json({ success: false, message: "You are not authorized" });
  }
};

exports.authorizedRole = (role) => {
  return (req, res, next) => {
    if (role === req.role) {
      next();
    }

    res.json("You are not authorized to access");
  };
};
