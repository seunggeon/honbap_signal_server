const { pool } = require("../../../config/database");
const { errResponse } = require("../../../config/response");
const { logger } = require("../../../config/winston");

const hashtagDao = require("./hashtagDao");


exports.getHashTag = async function (userIdx) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        
        const getHashTag = await hashtagDao.checkHashTag(connection, userIdx);
        connection.release();
        
        return getHashTag;
    } catch (err) {
        logger.error(`getHashTag Provider error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.getHashUser = async function (hashTag) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        
        const getHashUser = await hashtagDao.selectHashTag(connection, hashTag);
        connection.release();
        
        return getHashUser;
    } catch (err) {
        logger.error(`getHashUser Provider error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};
