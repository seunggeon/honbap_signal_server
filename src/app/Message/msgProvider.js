const { pool } = require("../../../config/database");
const { errResponse } = require("../../../config/response");
const { logger } = require("../../../config/winston");
const baseResponse = require("../../../config/baseResponseStatus");

const msgDao = require("./msgDao");

exports.getMsg = async function (roomId, sender, receiver) {
    try {
        const params = [sender, receiver, roomId];
        const connection = await pool.getConnection(async (conn) => conn);

        const getMsgResult = await msgDao.getMsg(connection, params);
        
        connection.release();
        return getMsgResult;

        } catch (err) {
        logger.error(`getMsg Provider error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.getRoomIdx = async function (roomId) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        const getRoomIdxResult = await msgDao.getRoomIdx(connection, roomId);
        connection.release();
        return getRoomIdxResult;
        } catch (err) {
        logger.error(`getRoomIdx Provider error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

// 쪽지 방 조회
exports.getMsgRoom = async function (userIdx) {
    try {
        const params = [userIdx, userIdx];
        const connection = await pool.getConnection(async (conn) => conn);
        const getMsgRoomResult = await msgDao.getMsgRoom(connection, params);
        connection.release();
        return getMsgRoomResult;
        } catch (err) {
        logger.error(`getMsgRoom Provider error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}