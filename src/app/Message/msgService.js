const { logger } = require("../../../config/winston");
const { pool } = require("../../../config/database");

//const reportProvider = require("./reportProvider");
const msgDao = require("./msgDao");

const baseResponse = require("../../../config/baseResponseStatus");
const { response } = require("../../../config/response");
const { errResponse } = require("../../../config/response");

// 채팅방 생성
exports.createMsgRoom = async function (userIdx, matchIdx, roomId) {
    try {
        const params = [userIdx, matchIdx, roomId];
        const connection = await pool.getConnection(async (conn) => conn);
        
        const createRoomResult = await msgDao.createMsgRoom(connection, params);

        connection.release();
        return response(baseResponse.SUCCESS);
    }
    catch (err) {
        logger.error(`App - createMsgRoom Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

// 채팅 보내기
exports.sendMsg = async function (roomId, senderIdx, text) {
    try {
        const params = [roomId, senderIdx, text];
        const connection = await pool.getConnection(async (conn) => conn);
        
        const sendMsgResult = await msgDao.sendMsg(connection, params);

        connection.release();
        return response(baseResponse.SUCCESS);
    }
    catch (err) {
        logger.error(`App - sendMsg Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

// 쪽지 방 삭제
exports.deleteMsg = async function (roomId, user) {
    try {
        const params = [roomId, user];
        const connection = await pool.getConnection(async (conn) => conn);
        
        const deleteMsgResult = await msgDao.deleteMsg(connection, params);

        connection.release();
        return response(baseResponse.SUCCESS);
    }
    catch (err) {
        logger.error(`App - deleteMsg Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}