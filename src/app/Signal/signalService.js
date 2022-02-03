const { logger } = require("../../../config/winston");
const { pool } = require("../../../config/database");
const secret_config = require("../../../config/secret");

const signalProvider = require("./signalProvider");
const signalDao = require("./signalDao");

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

// 시그널 정보 수정
exports.modifySigList = async function (sigPromiseTime ,sigPromiseArea, sigStart, userIdx) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        const params = [sigPromiseTime, sigPromiseArea, sigStart, userIdx];
        const result = await signalDao.updateSignal(connection, params);
        connection.release();

        //return response(baseResponse.SUCCESS);
        return result;

    } catch (err) {
        logger.error(`App - modifySigList Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

exports.matching = async function (matchIdx, userIdx) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        const params = [matchIdx, userIdx];
        const result = await signalDao.updateSigMatch(connection, params);

        connection.release;
        return result;
    } catch (err) {
        logger.error(`App - matching Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}