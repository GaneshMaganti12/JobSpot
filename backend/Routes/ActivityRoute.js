const express = require("express");
const router = express.Router();
const { isAuthorized } = require("../Middlewares/Auth");
const {
  createActivity,
  getActivity,
} = require("../Controllers/ActivityController");

router.post("/activity", isAuthorized, createActivity);

router.get("/activity", isAuthorized, getActivity);

module.exports = router;
