const env = require("dotenv");
const morgan = require("morgan");
const config = require("./config");
const route = require("./routes");
const express = require("express");
const middleWare = require("./middlewares");
const app = express();

// Configurateions
env.config();
config.db.connect();

// Middlewares
app.use([
  morgan("dev"),
  config.session.initialize(),
  config.cors(),
  express.json(),
]);

// Routes
app.use("/auth", route.auth);
app.use(middleWare.errorHandler);

// Setting the port for server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is listening at port " + PORT);
});
