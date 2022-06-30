const { pool } = require("../../../config/database");
const { errResponse } = require("../../../config/response");
const { logger } = require("../../../config/winston");
const baseResponse = require("../../../config/baseResponseStatus");

const hashtagDao = require("./hashtagDao");

// 해시태그 조회
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

// 해당 해시태그를 건 사람들 조회
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

exports.countHashTag = async function (userIdx) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);

    const result = await hashtagDao.countHashTag(connection, userIdx);

    connection.release();

    return result;
  } catch (err) {
    logger.error(`countHashTag Provider error\n: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  }
};
