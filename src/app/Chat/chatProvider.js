const { pool } = require("../../../config/database");
const { errResponse } = require("../../../config/response");
const { logger } = require("../../../config/winston");
const baseResponse = require("../../../config/baseResponseStatus");

const chatDao = require("./chatDao");

// 방 이름 가져오기
exports.getRooms = async function (userIdx) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    const getRoomsResult = await chatDao.getRooms(connection, [userIdx, userIdx]);
    connection.release();

    let roomNameList = [];
    getRoomsResult.map(room => {
      roomNameList.push(room.roomName);
    })

    return roomNameList;
  } catch (err) {
    logger.error(`getRooms Provider error\n: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  }
};
