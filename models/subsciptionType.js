const mongoose = require("mongoose");

const subTypeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  frequency: { type: Number, min: 1, max: 30, required: true },
  tipsPlatefrom: {
    type: String,
    required: true,
    enum: {
      values: ["website", "sms", "both"],
      message: "Value is not supported!",
    },
  },
});

module.exports = mongoose.model("Subscription Type", subTypeSchema);
