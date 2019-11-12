
import express from "express";
import flash from "express-flash";
import bodyParser from "body-parser";
import path from "path";
import logger from "./util/logger";
import dotenv from "dotenv";
import fs from "fs";

import * as homeController from "./controllers/home";
import * as errorController from "./controllers/error";
import * as emailController from "./controllers/email";

// load configuration
if (fs.existsSync(".env")) {
    logger.debug("Using .env file to supply config environment variables");
    dotenv.config({ path: ".env" });
} else {
    logger.debug("Using .env.example file to supply config environment variables");
    dotenv.config({ path: ".env.example" });  // you can delete this after you create your own .env file!
}

// Create Express server
const app = express();

app.set("port", process.env.PORT || 3000);
app.use(flash());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Primary app routes.
 */
app.get("/", homeController.index);
app.get("/error", errorController.handleError);
app.post("/v1/emails", emailController.sendEmail);
app.get("/v1/emails/:id", emailController.getEmailStatus);
app.delete("/v1/emails/:id", emailController.deleteEmail);


process.on("unhandledRejection", error => {
    // Will print "unhandledRejection err is not defined"
    console.log("unhandledRejection");
  });
  
export default app;
