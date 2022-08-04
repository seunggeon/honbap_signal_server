const { pool } = require("../../../config/database");
const { errResponse } = require("../../../config/response");
const { logger } = require("../../../config/winston");
const baseResponse = require("../../../config/baseResponseStatus");

const userDao = require("./chatDao");

// 회원 정보 확인
exports.getRooms = async function (userIdx) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    const userIdCheckResult = await userDao.existUserEmail(connection, email);
    connection.release();

    return userIdCheckResult;
  } catch (err) {
    logger.error(`userIdCheck Provider error\n: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  }
};
