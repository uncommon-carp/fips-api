const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

const db = require("./config/connection");
const serverDevPort = 8000;

mongoose.connect(db, {
  useNewUrlParser: true,
});

mongoose.connection
  .on("open", () => console.log("Connected to MongoDB"))
  .on("close", () => console.log("Disconnected from MongoDB"))
  .on("error", (error) => console.log(error));

const app = require("liquid-express-views")(express());

app.use(express.urlencoded({ extended: false })); // parse urlencoded request bodies
app.use(express.static("public"));
// set CORS headers on response from this API using the `cors` NPM package
// `CLIENT_ORIGIN` is an environment variable that will be set on Heroku

// define port for API to run on
// adding PORT= to your env file will be necessary for deployment
const port = process.env.PORT || serverDevPort;

const apiRoutes = require("./app/routes/apiRoutes");
const webRoutes = require("./app/routes/webRoutes");

app.use("/api", apiRoutes);
app.use(webRoutes);

app.listen(port, () => {
  console.log("server listening on " + port);
});
