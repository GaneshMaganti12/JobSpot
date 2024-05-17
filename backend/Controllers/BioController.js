const asyncHandler = require("express-async-handler");
const Bio = require("../Models/BioModel");
const User = require("../Models/UserModel");

exports.postBio = asyncHandler(async (req, res) => {
  try {
    const bio = await Bio.findOne({ user_id: req.body.user_id });

    if (!bio) {
      await Bio.create(req.body);
    } else {
      await Bio.deleteOne({ user_id: req.body.user_id });
      await Bio.create(req.body);
    }
    res.status(201).json({ success: true, message: "Bio is Added" });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
});

exports.getBio = asyncHandler(async (req, res) => {
  try {
    const bio = await Bio.findOne({ user_id: req.id });

    if (!bio) {
      res.status(200).json({ success: true, data: {} });
    } else {
      res.status(200).json({ success: true, data: bio });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
});
