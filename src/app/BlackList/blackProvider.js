const { pool } = require("../../../config/database");
const { errResponse } = require("../../../config/response");
const { logger } = require("../../../config/winston");
const baseResponse = require("../../../config/baseResponseStatus");

const blackDao = require("./blackDao");

// 블랙리스트 조회
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
};

// 블랙리스트 상세 조회
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
};

// 블랙리스트 유/무 체크
exports.checkBlackIdx = async function (userIdx, blackIdx) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    const params = [userIdx, blackIdx];
    const blackCheckResult = await blackDao.checkBlackIdx(connection, params);
    connection.release();

    return blackCheckResult;
  } catch (err) {
    logger.error(`checkBlackIdx Provider error\n: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  }
};
