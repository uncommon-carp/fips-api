"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const connection_1 = require("./config/connection");
const liquidjs_1 = require("liquidjs");
const apiRoutes_1 = __importDefault(require("./app/routes/apiRoutes"));
const webRoutes_1 = __importDefault(require("./app/routes/webRoutes"));
const engine = new liquidjs_1.Liquid();
dotenv_1.default.config();
const serverDevPort = 8000;
mongoose_1.default.connect(connection_1.db);
mongoose_1.default.connection
    .on("open", () => console.log("Connected to MongoDB"))
    .on("close", () => console.log("Disconnected from MongoDB"))
    .on("error", (error) => console.log(error));
const app = (0, express_1.default)();
app.engine("liquid", engine.express());
app.set("views", "./views"); // specify the views directory
app.set("view engine", "liquid");
app.use(express_1.default.urlencoded({ extended: false })); // parse urlencoded request bodies
app.use(express_1.default.static("public"));
const port = process.env.PORT || serverDevPort;
app.use("/api", apiRoutes_1.default);
app.use(webRoutes_1.default);
app.listen(port, () => {
    console.log("server listening on " + port);
});
//# sourceMappingURL=server.js.map