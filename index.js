const express = require("./config/express");
const { logger } = require("./config/winston");
const util = require('util');
const { Server } = require("http2");

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

module.exports = {webserver};