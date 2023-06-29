const mongoose = require("mongoose");

const connect = () => {
  const options = {
    dbName: process.env.DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
  };

  mongoose
    .connect(process.env.MONGO_DB, options)
    .then(() => console.log("Datbase connected successfully!"))
    .catch(() => console.log("Filed to connect to the database!"));
};

module.exports = {
  connect,
};
