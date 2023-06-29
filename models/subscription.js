const mongoose = require("mongoose");

const subSchema = mongoose.Schema({
  name: { type: String, required: true },
  type: { type: mongoose.Schema.Types.ObjectId, required: true },
  tipsLimit: { type: Number, required: true, min: 1 },
  status: {
    type: String,
    required: true,
    default: "active",
    enum: {
      values: ["active", "deactive"],
      message: "Value is not supported!",
    },
  },
  price: { type: Number, required: true },
});

module.exports = mongoose.model("Subscription", subSchema);
