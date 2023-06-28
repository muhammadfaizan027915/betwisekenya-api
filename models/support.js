const mongoose = require("mongoose");

const supportSchema = mongoose.Schema({
  email: { type: String, required: true },
  phone: { type: Number },
  concern: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: {
      values: ["pending", "completed"],
      message: "Value is not supported!",
    },
  },
});

module.exports = mongoose.model("Support", supportSchema);
