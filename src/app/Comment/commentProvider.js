const { pool } = require("../../../config/database");
const { errResponse } = require("../../../config/response");
const { logger } = require("../../../config/winston");

const commentDao = require("./commentDao");


// 나에게 써진 후기 조회
exports.getCommentedList = async function (userIdx) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        
        const getCommentedList = await commentDao.selectCommented(connection, userIdx);
        connection.release();

        return getCommentedList;
    } catch (err) {
        logger.error(`getCommentedList Provider error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

// 내가 쓴 후기 조회
exports.getCommentingList = async function (writerIdx) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        
        const getCommentingList = await commentDao.selectCommenting(connection, writerIdx);
        connection.release();

        return getCommentingList;
    } catch (err) {
        logger.error(`getCommentingList Provider error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}