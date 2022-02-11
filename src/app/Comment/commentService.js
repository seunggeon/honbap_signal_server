const { logger } = require("../../../config/winston");
const { pool } = require("../../../config/database");
const secret_config = require("../../../config/secret");

const commentProvider = require("./commentProvider");
const commentDao = require("./commentDao");

const baseResponse = require("../../../config/baseResponseStatus");
const { response } = require("../../../config/response");
const { errResponse } = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { connect } = require("http2");

// 후기 등록
exports.createComment = async function (signalIdx, userIdx, writerIdx, comment, star) {
    try {
        const params = [signalIdx, userIdx, writerIdx, comment, star];
        const user1 = [userIdx];
        const user2 = [userIdx];
        const signal = [signalIdx];
        const connection = await pool.getConnection(async (conn) => conn);
        const createCommentResult = await commentDao.insertComment(connection, params);
        const plusMannerResult = await commentDao.plusManner(connection, user1);
        const calculateMannerResult = await commentDao.forCalculateManner(connection, signal, user2);

        connection.release();
        return response(baseResponse.SUCCESS);
    }
    catch (err) {
        logger.error(`App - createComment Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}