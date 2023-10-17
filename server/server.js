const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./src/routes/index.js");
require("dotenv").config();
const test = 0;
//variable
const PORT = process.env.PORT || 8000;
const mongoDb = process.env.MONGO_DB;

//app start
const app = express();

//middleware
app.use(express.json(), express.urlencoded({ extended: false }));
app.use(cors());

//connect to database
mongoose
  .connect(mongoDb)
  .then(() => {
    console.log("connect to db successfully");
  })
  .catch((e) => {
    console.log(e);
  });

//route app
routes(app);
// Define a health check route
app.get("/health", (req, res) => {
  // Check the health of your application here
  // If everything is okay, return a 200 OK response
  res.status(200).send("OK");
});

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
