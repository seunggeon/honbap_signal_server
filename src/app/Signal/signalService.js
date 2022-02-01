const { logger } = require("../../../config/winston");
const { pool } = require("../../../config/database");
const secret_config = require("../../../config/secret");

const userProvider = require("./signalProvider");
const userDao = require("./signalDao");

const baseResponse = require("../../../config/baseResponseStatus");
const { response } = require("../../../config/response");
const { errResponse } = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { connect } = require("http2");


// 시그널 등록
exports.createSignal = async function (userIdx, matchIdx, sigPromiseTime, sigPromiseArea) {
    try {
        const signalRows = [userIdx, matchIdx, sigPromiseTime, sigPromiseArea];
        const connection = await pool.getConnection(async (conn) => conn);
        
        // const createSignalResult = await userDao.insertSignal(connection, signalRows);

        connection.release();
        return response(baseResponse.SUCCESS);
    }
    catch (err) {
        logger.error(`App - createSignal Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}