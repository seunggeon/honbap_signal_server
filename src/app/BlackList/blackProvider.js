const { pool } = require("../../../config/database");
const { errResponse } = require("../../../config/response");
const { logger } = require("../../../config/winston");

const blackDao = require("./blackDao");

exports.getBlackList = async function (userIdx) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        const getResult = await blackDao.selectBlack(connection, userIdx);
        connection.release();

        return getResult;
    } catch (err) {
        logger.error(`getBlackList Provider error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

exports.getBlackPlus = async function (userIdx, blackIdx) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        const params = [userIdx, blackIdx];
        const getResult = await blackDao.selectBlackInfo(connection, params);
        connection.release();

        return getResult;
    } catch (err) {
        logger.error(`getBlackPlus Provider error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}