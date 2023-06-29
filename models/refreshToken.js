const mongoose = require("mongoose");

const subSchema = mongoose.Schema({
  userId: { type: String, required: true },
  refreshToken: { type: String, required: true },
});

module.exports = mongoose.model("Refresh Token", subSchema);
