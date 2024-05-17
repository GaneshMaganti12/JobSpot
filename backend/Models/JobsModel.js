const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  company_logo_url: {
    type: String,
    required: true,
  },
  company_website_url: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  job_description: {
    type: String,
    required: true,
  },
  employment_type: {
    type: String,
    required: true,
  },
  package_per_annum: {
    type: String,
    required: true,
  },
  skills: {
    type: Array,
    required: true,
  },
  life_at_company: {
    type: Object,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
});

const Jobs = mongoose.model("jobs", jobsSchema);

module.exports = Jobs;
