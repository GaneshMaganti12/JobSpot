const express = require("express");
const router = express.Router();
const { isAuthorized } = require("../Middlewares/Auth");
const { postBio, getBio } = require("../Controllers/BioController");

router.post("/bio", isAuthorized, postBio);

router.get("/bio", isAuthorized, getBio);

module.exports = router;
