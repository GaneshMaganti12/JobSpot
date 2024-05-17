const Jobs = require("../Models/JobsModel");
const asyncHandler = require("express-async-handler");
const { ObjectId } = require("mongodb");

exports.createJobs = asyncHandler(async (req, res) => {
  try {
    const jobs = await Jobs.create(req.body);
    res.status(201).json({ success: true, data: jobs });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
});

exports.getJobs = asyncHandler(async (req, res) => {
  try {
    const { search, minimum_package, employment_type } = req.query;

    let employmentType = "";

    if (employment_type) {
      const employment = employment_type.split(",");

      const employmentDetails = [
        { id: "FULLTIME", title: "Full Time" },
        { id: "PARTTIME", title: "Part Time" },
        { id: "FREELANCE", title: "Freelance" },
        { id: "INTERNSHIP", title: "Internship" },
      ];

      employmentType = employment.map((type) => {
        const found = employmentDetails.find((detail) => detail.id === type);
        return found ? found.title : type;
      });
    }

    let query = {};

    const page = req.query.page || 1;

    const limit = 8;

    const skip = (page - 1) * limit;

    if (search) {
      query.title = { $regex: new RegExp(search, "i") };
    }

    if (employmentType.length > 0 && employmentType[0] !== "") {
      query.employment_type = { $in: employmentType };
    }

    query.package_per_annum = { $gte: minimum_package };

    const jobs = await Jobs.find(query)
      .skip(skip)
      .limit(8)
      .select(
        "_id title rating company_logo_url location job_description employment_type package_per_annum"
      );

    const totalDocuments = await Jobs.countDocuments(query);
    const totalPages = Math.ceil(totalDocuments / limit);

    res
      .status(200)
      .json({ success: true, data: jobs, total_pages: totalPages });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
});

exports.getJob = asyncHandler(async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Jobs.aggregate([
      {
        $match: {
          _id: new ObjectId(jobId),
        },
      },
      {
        $lookup: {
          from: "jobs",
          localField: "company",
          foreignField: "company",
          as: "similar_jobs",
        },
      },
      {
        $unwind: "$similar_jobs",
      },
      {
        $match: {
          "similar_jobs._id": { $ne: new ObjectId(jobId) },
        },
      },
      {
        $group: {
          _id: {
            id: "$_id",
            title: "$title",
            rating: "$rating",
            company_logo_url: "$company_logo_url",
            company_website_url: "$company_website_url",
            location: "$location",
            job_description: "$job_description",
            employment_type: "$employment_type",
            package_per_annum: "$package_per_annum",
            skills: "$skills",
            life_at_company: "$life_at_company",
            company: "$company",
          },
          similar_jobs: {
            $push: {
              id: "$similar_jobs._id",
              title: "$similar_jobs.title",
              rating: "$similar_jobs.rating",
              company_logo_url: "$similar_jobs.company_logo_url",
              location: "$similar_jobs.location",
              job_description: "$similar_jobs.job_description",
              employment_type: "$similar_jobs.employment_type",
            },
          },
        },
      },
      {
        $project: {
          job_details: "$_id",
          similar_jobs: 1,
          _id: 0,
        },
      },
    ]);
    res.status(200).json({ success: true, data: job });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
});

exports.updateJob = asyncHandler(async (req, res) => {
  try {
    const job = await Jobs.findByIdAndUpdate(
      { _id: req.params.id },
      { is_applied: req.body.isApplied }
    );
    res.status(200).json({ success: true, message: "Successfully Updated" });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
});

exports.deleteJob = asyncHandler(async (req, res) => {
  try {
    await Jobs.findByIdAndDelete({ _id: req.params.id });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
});
