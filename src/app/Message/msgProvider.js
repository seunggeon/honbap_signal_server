const { pool } = require("../../../config/database");
const { errResponse } = require("../../../config/response");
const { logger } = require("../../../config/winston");
const baseResponse = require("../../../config/baseResponseStatus");

const msgDao = require("./msgDao");

exports.getMsg = async function (roomId, sender, receiver) {
    try {
        const params = [sender, receiver, roomId];
        const connection = await pool.getConnection(async (conn) => conn);

        getMsgResult = await msgDao.getMsg(connection, params);
        
        connection.release();
        return getMsgResult;

        } catch (err) {
        logger.error(`getMsg Provider error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
  };