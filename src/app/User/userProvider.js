const { pool } = require("../../../config/database");
const { errResponse } = require("../../../config/response");
const { logger } = require("../../../config/winston");

const userDao = require("./userDao");

// provider : read business logic 처리 
// Dao.js에서 선언된 원본을 가지고 호출해서 사용. 데이터 받아서 controller 에게 넘겨줌.
// 실제로 어떻게 가동해서 쓸지는 controller에서 결정.


// checking for postUsers : 데옹
// error message는 추후에 추가할 예정입니다.
exports.userIdCheck = async function (userId) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    const userIdCheckResult = await userDao.existUserId(connection, userId);
    connection.release();

    return userIdCheckResult;
  } catch (err) {
    logger.error(`userIdCheck Provider error\n: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  }
};
exports.emailCheck = async function (email) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    const emailCheckResult = await userDao.existUserEmail(connection, email);
    connection.release();

    return emailCheckResult;
  } catch (err) {
    logger.error(`emailCheck Provider error\n: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  }
};
exports.phoneNumCheck = async function (phoneNum) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    const phoneNumCheckResult = await userDao.existUserPhone(connection, phoneNum);
    connection.release();

    return phoneNumCheckResult;
  } catch (err) {
    logger.error(`phoneNumCheck Provider error\n: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  }
};

//======================================
//mypage
/*exports.nickNameCheck = async function (nickName) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    const nickNameCheckResult = await userDao.existUserNickname(connection, nickName);
    connection.release();

    return nickNameCheckResult;
  } catch (err) {
    logger.error(`nicknameCheck Provider error\n: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  }
};*/


/*
// 비밀 번호 체크
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
*/
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