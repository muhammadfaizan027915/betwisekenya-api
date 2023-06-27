const mongoose = require("mongoose");

const tipSchema = new mongoose.Schema(
  {
    matchName: { type: String, required: true },
    winningTeam: { type: String, required: true },
    probability: { type: Number, min: 1, max: 100, required: true },
    analysis: { type: String },
    additionalComments: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tip", tipSchema);
