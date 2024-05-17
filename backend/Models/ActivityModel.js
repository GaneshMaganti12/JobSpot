const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const activitySchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },

  job_id: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    required: true,
  },

  company: {
    type: String,
    required: true,
  },

  company_logo_url: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    required: true,
  },

  applied_at: {
    type: String,
    required: true,
  },
});

const Activity = mongoose.model("activity", activitySchema);

module.exports = Activity;
