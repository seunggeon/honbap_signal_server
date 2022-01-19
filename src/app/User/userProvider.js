const { pool } = require("../../../config/database");
const { errResponse } = require("../../../config/response");
const { logger } = require("../../../config/winston");

const userDao = require("./userDao");

// provider : read business logic 처리 
// Dao.js에서 선언된 원본을 가지고 호출해서 사용. 데이터 받아서 controller 에게 넘겨줌.
// 실제로 어떻게 가동해서 쓸지는 controller에서 결정.

// 휴대폰 번호 체크
exports.passwordCheck = async function (hashedPassword) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);

        const result = await userDao.selectUserPhoneNum(connection, hashedPassword);
        connection.release();

        return result;
    } catch (err) {
        logger.error(`passwordCheck Provider error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

// 닉네임 체크
exports.nicknameCheck = async function (nickName) {
    try {
      const connection = await pool.getConnection(async (conn) => conn);
  
      const result = await userDao.selectUserNickname(connection, nickName);
      connection.release();
  
      return result;
    } catch (err) {
      logger.error(`nicknameCheck Provider error\n: ${err.message}`);
      return errResponse(baseResponse.DB_ERROR);
    }
};

// 유저 ID 조회
exports.getUserId = async function (hashedPassword) {
    try {
      const connection = await pool.getConnection(async (conn) => conn);
  
      const result = await userDao.selectUserId(connection, hashedPassword);
      connection.release();
  
      return result;
    } catch (err) {
      logger.error(`getUserInfo Provider error\n: ${err.message}`);
      return errResponse(baseResponse.DB_ERROR);
    }
};