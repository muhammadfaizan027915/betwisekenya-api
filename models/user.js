const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    phone: { type: Number, required: true, unique: true },
    bettingPlateform: { type: String, required: true, default: null },
    password: { type: String, required: true },
    status: {
      type: String,
      required: true,
      default: "active",
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
      },
      subscribedAt: {
        type: Date,
      },
      tipsCount: { type: Number,  },
    },
    roles: { type: Array, required: true, default: ['user'] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
