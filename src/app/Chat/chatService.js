const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') })
const { logger } = require("../../../config/winston");
const { pool } = require("../../../config/database");
// const secret_config = require("../../../config/secret");
// const secret_config = require()

const jwtsecret = process.env.JWTSECRET

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
// exports.createUsers = async function (email, password, userName, nickName, birth, phoneNum, sex) {
//     try {
//         const emailRows = await userProvider.emailCheck(email);
//         if (emailRows.length > 0)
//             return errResponse(baseResponse.SIGNUP_REDUNDANT_EMAIL);
        
//         const nickNameRows = await userProvider.nickNameCheck(nickName);
//         if (nickNameRows.length > 0)
//             return errResponse(baseResponse.SIGNUP_REDUNDANT_NICKNAME);
    
//         const phoneNumRows = await userProvider.phoneNumCheck(phoneNum);
//         if (phoneNumRows.length > 0)
//             return errResponse(baseResponse.SIGNUP_REDUNDANT_PHONENUMBER);

//         // 비밀번호 암호화
//         const hashedPassword = await crypto
//             .createHash("sha512")
//             .update(password)
//             .digest("hex");

//         // 쿼리문에 사용할 변수 값을 배열 형태로 전달
//         const insertUserInfoParams = [email, hashedPassword, userName, nickName, birth, phoneNum, sex];

//         const connection = await pool.getConnection(async (conn) => conn);

//         const emailResult = await userDao.insertUserInfo(connection, insertUserInfoParams);
//         // console.log(`추가된 회원 : ${emailResult.insertEmail}`)  // emailResult 데이터 형식이 어떤지 확인 필요
//         connection.release();
//         return response(baseResponse.SUCCESS);

//     } catch (err) {
//         logger.error(`App - createUsers Service error\n: ${err.message}`);
//         return errResponse(baseResponse.DB_ERROR);
//     }
// };
