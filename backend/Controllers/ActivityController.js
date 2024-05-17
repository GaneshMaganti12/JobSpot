const Activity = require("../Models/ActivityModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");
const { sendingToMail } = require("../Utils/Utils");

exports.createActivity = asyncHandler(async (req, res) => {
  try {
    const activity = await Activity.create(req.body);

    let mailDetails = {
      from: "jobSpot.app@gmail.com",
      to: req.userEmail,
      subject: "Job Application",
      text: `You have applied for a ${req.body.role} role at ${req.body.company}.`,
    };
    sendingToMail(mailDetails);

    res.status(201).json({ success: true, data: activity });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
});

exports.getActivity = asyncHandler(async (req, res) => {
  try {
    const activity = await Activity.aggregate([
      {
        $match: {
          user_id: new ObjectId(req.id),
        },
      },

      {
        $group: {
          _id: { date: "$date" },
          createdAt: { $first: "$date" },

          activity: {
            $push: {
              id: "$_id",
              job_id: "$job_id",
              role: "$role",
              company: "$company",
              company_logo_url: "$company_logo_url",
              time: "$applied_at",
            },
          },
        },
      },

      {
        $unwind: "$activity",
      },

      {
        $sort: {
          "activity.time": -1,
        },
      },

      {
        $group: {
          _id: "$_id",
          createdAt: {
            $first: "$createdAt",
          },
          activity: {
            $push: "$activity",
          },
        },
      },

      {
        $sort: {
          createdAt: -1,
        },
      },

      {
        $project: {
          _id: 0,
        },
      },
    ]);
    res.status(200).json({ success: true, data: activity });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
});
