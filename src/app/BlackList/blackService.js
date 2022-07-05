const { logger } = require("../../../config/winston");
const { pool } = require("../../../config/database");
const secret_config = require("../../../config/secret");

const blackProvider = require("./blackProvider");
const blackDao = require("./blackDao");

const baseResponse = require("../../../config/baseResponseStatus");
const { response } = require("../../../config/response");
const { errResponse } = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { connect } = require("http2");


// 블랙 리스트 입력
exports.postBlackList = async function (userIdx, blackIdx, whyBlack) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        const params = [userIdx, blackIdx, whyBlack];
        const postResult = await blackDao.insertBlack(connection, params);
        connection.release();

        return postResult;
    } catch (err) {
        logger.error(`App - postBlackList Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

// 블랙 리스트 삭제
exports.deleteBlackList = async function (userIdx, blackIdx) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        const params = [userIdx, blackIdx];
        const deleteResult = await blackDao.deleteBlack(connection, params);
        connection.release();

        return deleteResult;
    } catch (err) {
        logger.error(`App - deleteBlackList Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}