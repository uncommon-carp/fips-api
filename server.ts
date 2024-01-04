import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { db } from "./config/connection";
import { Liquid } from "liquidjs";
import apiRoutes from "./app/routes/apiRoutes";
import webRoutes from "./app/routes/webRoutes";

const engine = new Liquid();

dotenv.config();

const serverDevPort = 8000;

mongoose.connect(db);

mongoose.connection
  .on("open", () => console.log("Connected to MongoDB"))
  .on("close", () => console.log("Disconnected from MongoDB"))
  .on("error", (error) => console.log(error));

const app = express();

app.engine("liquid", engine.express());
app.set("views", "./views"); // specify the views directory
app.set("view engine", "liquid");
app.use(express.urlencoded({ extended: false })); // parse urlencoded request bodies
app.use(express.static("public"));

const port = process.env.PORT || serverDevPort;

app.use("/api", apiRoutes);
app.use(webRoutes);

app.listen(port, () => {
  console.log("server listening on " + port);
});
