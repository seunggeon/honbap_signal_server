const { logger } = require("../../../config/winston");
const { pool } = require("../../../config/database");
const secret_config = require("../../../config/secret");

const hashtagProvider = require("./hashtagProvider");
const hashtagDao = require("./hashtagDao");

const baseResponse = require("../../../config/baseResponseStatus");
const { response } = require("../../../config/response");
const { errResponse } = require("../../../config/response");

const jwt = require("jsonwebtoken");
const { connect } = require("http2");

// 해시태그 등록
exports.postHashTag = async function (userIdx, hashTag) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        const params = [userIdx, hashTag];
        const postHashResult = await hashtagDao.insertHashTag(connection, params);
        connection.release();

        return postHashResult;
    } catch (err) {
        logger.error(`App - postHashTag Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

// 해시태그 삭제
exports.deleteHashTag = async function (userIdx, hashTag) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        const params = [userIdx, hashTag];
        const deleteHashResult = await hashtagDao.deleteHashTag(connection, params);
        connection.release();

        return deleteHashResult;
    } catch (err) {
        logger.error(`App - postHashTag Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}
