const { pool } = require("../../../config/database");
const { errResponse } = require("../../../config/response");
const { logger } = require("../../../config/winston");
const baseResponse = require("../../../config/baseResponseStatus");

const signalDao = require("./signalDao");

// 시그널 조회
exports.getSignalList = async function (userIdx) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);

    const userIdxCheckResult = await signalDao.selectSignalList(
      connection,
      userIdx
    );
    connection.release();

    return userIdxCheckResult[0];
  } catch (err) {
    logger.error(`getSignalList Provider error\n: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  }
};

// 시그널 신청 리스트 조회
exports.getSignalApply = async function (userIdx) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);

    const applyResult = await signalDao.getSignalApply(connection, userIdx);
    connection.release();

    return applyResult;
  } catch (err) {
    logger.error(`getSignalApply Provider error\n: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  }
};

// 이전 시그널들 조회
exports.endSignals = async function (userIdx, userIdx2) {
  try {
    const params = [userIdx, userIdx2];
    const connection = await pool.getConnection(async (conn) => conn);

    const endsResult = await signalDao.endSignals(connection, params);
    connection.release();

    return endsResult;
  } catch (err) {
    logger.error(`endSignals Provider error\n: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  }
};
