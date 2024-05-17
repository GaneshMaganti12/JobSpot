const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bioSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },

  bio: {
    type: String,
    required: true,
  },

  created_at: {
    type: Date,
    default: Date.now(),
  },
});

const Bio = mongoose.model("bio", bioSchema);

module.exports = Bio;
