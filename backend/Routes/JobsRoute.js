const express = require("express");
const router = express.Router();
const { isAuthorized, authorizedRole } = require("../Middlewares/Auth");
const {
  createJobs,
  getJobs,
  getJob,
  updateJob,
  deleteJob,
} = require("../Controllers/JobsController");

router.post("/jobs", [isAuthorized, authorizedRole("admin")], createJobs);

router.get("/jobs", isAuthorized, getJobs);

router.get("/job/:id", isAuthorized, getJob);

router.patch("/job/:id", isAuthorized, authorizedRole("admin"), updateJob);

router.delete("/job/:id", isAuthorized, authorizedRole("admin"), deleteJob);

module.exports = router;
