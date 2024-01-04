"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// creating a base name for the mongodb
// REPLACE THE STRING WITH YOUR OWN DATABASE NAME
const mongooseBaseName = "fipsCountyCodes";
// create the mongodb uri for development and test
const database = {
    development: `mongodb://127.0.0.1:27017/${mongooseBaseName}-development`,
    test: `mongodb://127.0.0.1:27017/${mongooseBaseName}-test`,
};
// Identify if development environment is test or development
// select DB based on whether a test file was executed before `server.js`
const localDb = process.env.TESTENV ? database.test : database.development;
// Environment variable MONGODB_URI will be available in
// heroku production evironment otherwise use test or development db
exports.db = process.env.MONGODB_URI || localDb;
//# sourceMappingURL=connection.js.map