const mongoose = require("mongoose");

const options = {
  dbName: process.env.DB_NAME,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connect = () => {
  mongoose
    .connect(process.env.MONGO_DB, options)
    .then(() => console.log("Datbase connected successfully!"))
    .catch((err) => console.log(err));
};

module.exports = {
  connect,
};
