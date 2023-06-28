const cors = require("cors");

module.exports = () =>
  cors({
    credentials: true,
    optionsSuccessStatus: 200,
    origin: process.env.ORIGIN,
    methods: ["GET", "PUT", "POST", "DELETE"],
  });
