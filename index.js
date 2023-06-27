const env = require("dotenv");
const app = require("express")();
const morgan = require('morgan')
const db = require('./config/db')


// Configurateions
env.config();
db.connect();


// Middlewares
app.use([morgan('dev')])


// Setting the port for server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is listening at port " + PORT);
});
