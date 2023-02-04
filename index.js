const express = require("./config/express");
const { logger } = require("./config/winston");
// const { Server } = require("http2");
const { chatSocket } = require("./src/app/Chat/chatSocket");

let port;

if (process.env.NODE_ENV === "development") {
  port = 8080;
} else if (process.env.NODE_ENV === "production") {
  port = 3000;
} else {
  port = 3001;
}
const webserver = express().listen(port);
logger.info(`${process.env.NODE_ENV} - API Server Start At Port ${port}`);

chatSocket(webserver);