const { logger } = require("../../../config/winston");
const { pool } = require("../../../config/database");
const secret_config = require("../../../config/secret");

const userProvider = require("./userProvider");
const userDao = require("./userDao");

const baseResponse = require("../../../config/baseResponseStatus");
const { response } = require("../../../config/response");
const { errResponse } = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { connect } = require("http2");

// Service: Create, Update, Delete 비즈니스 로직 처리

  // 회원가입
  // 오류 코드는 나중에 수정할 예정
exports.createUsers = async function (userId, password, userName, birth, email, phoneNum, sex) {
    try {
        const userIdRows = await userProvider.userIdCheck(userId);
        if (userIdRows.length > 0)
            return errResponse(baseResponse.SIGNUP_REDUNDANT_USERID);

        const emailRows = await userProvider.emailCheck(email);
        if (emailRows.length > 0)
            return errResponse(baseResponse.SIGNUP_REDUNDANT_EMAIL);

        const phoneNumRows = await userProvider.phoneNumCheck(phoneNum);
        if (phoneNumRows.length > 0)
            return errResponse(baseResponse.SIGNUP_REDUNDANT_PHONENUMBER);

        // 비밀번호 암호화
        const hashedPassword = await crypto
            .createHash("sha512")
            .update(password)
            .digest("hex");

        // 쿼리문에 사용할 변수 값을 배열 형태로 전달
        const insertUserInfoParams = [userId, hashedPassword, userName, birth, email, phoneNum, sex];

        const connection = await pool.getConnection(async (conn) => conn);

        const userIdResult = await userDao.insertUserInfo(connection, insertUserInfoParams);
        console.log(`추가된 회원 : ${userIdResult[0].insertId}`)
        connection.release();
        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - createUsers Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

// 유저 프로필 등록 : 데옹
exports.createUserProfile = async function (userIdx, nickName, profileImg, taste, hateFood, interest, avgSpeed, preferArea, mbti, userIntroduce) {
  try {
      const nickNameRows = await userProvider.nickNameCheck(nickName);
      if (nickNameRows.length > 0)
          return errResponse(baseResponse.SIGNUP_REDUNDANT_NICKNAME);

      // 쿼리문에 사용할 변수 값을 배열 형태로 전달
      const insertUserProfileParams = [userIdx, nickName, profileImg, taste, hateFood, interest, avgSpeed, preferArea, mbti, userIntroduce];

      const connection = await pool.getConnection(async (conn) => conn);

      const profileResult = await userDao.insertUserProfile(connection, insertUserProfileParams);
      console.log(`추가된 회원 : ${profileResult[0].insertId}`)
      connection.release();
      return response(baseResponse.SUCCESS);

  } catch (err) {
      logger.error(`App - createUserProfile Service error\n: ${err.message}`);
      return errResponse(baseResponse.DB_ERROR);
  }
};


exports.updateUserProfile = async function (photoURL, nickname, userId) {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      await connection.beginTransaction();
  
      const params = [photoURL, nickname, userId];
      const result = await userDao.updateUserProfile(connection, params);
  
      await connection.commit();
  
      connection.release();
  
      return result;
    } catch (err) {
      await connection.rollback();
      connection.release();
      logger.error(`updateUserProfile Service error\n: ${err.message}`);
      return errResponse(baseResponse.DB_ERROR);
    }
};

exports.updatePassword = async function(password, userIdx) {
    try {
        const hashedPassword = await crypto
        .createHash("sha512")
        .update(password)
        .digest("hex");

        const connection = await pool.getConnection(async (conn) => conn);

        const params = [hashedPassword, userIdx];
        const result = await userDao.updatePassword(connection, params);

        connection.release();

        return result;
    } catch (err) {
        logger.error(`App - updatePassword Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

