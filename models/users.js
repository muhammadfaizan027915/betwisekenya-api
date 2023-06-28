const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true, unique: true },
    bettingPlateform: { type: String, required: true },
    password: { type: String, required: true },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["active", "deactive"],
        message: "Value is not supported!",
      },
    },
    paid: { type: Boolean, required: true, default: false },
    subscription: {
      subscriptionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subscription",
        required: true,
      },
      subscribedAt: {
        type: Date,
        default: Date.now(),
      },
      tipsCount: { type: Number, required: true },
    },
    roles: [{ type: String, required: true }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
