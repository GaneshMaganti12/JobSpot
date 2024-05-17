const express = require("express");
const router = express.Router();
const { isAuthenticated, isAuthorized } = require("../Middlewares/Auth");
const {
  signUp,
  signIn,
  resetPassword,
  newPassword,
  changePassword,
} = require("../Controllers/UserController");

router.post("/sign-up", signUp);

router.post("/sign-in", isAuthenticated, signIn);

router.post("/reset-password", resetPassword);

router.post("/reset/:userId/:token", newPassword);

router.patch("/change-password", isAuthorized, changePassword);

module.exports = router;
