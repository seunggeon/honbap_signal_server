//const jwtMiddleware = require("../../../config/jwtMiddleware");
const userProvider = require("../../app/User/userProvider");
const userService = require("../../app/User/userService");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
//const logger = require("../../../config/winston");
const crypto = require("crypto");

//controller : 판단 부분.
/**
 * API No. 1
 * API Name : 로그인 API (비회원일 경우 회원가입 후 로그인)
 * [POST] /user/login
 */
 

exports.createUser = async function (req, res) {
//   const { userPhoneNum } = req.body;
//    수정 필요 !
//   const sendAuth = createAuthNum();

  
  // 비밀번호 암호화
  const hashedPassword = await crypto
    .createHash("sha512")
    .update(password)
    .digest("hex");

  const checkPassword = await userProvider.passwordCheck(hashedPassword);

  // 이미 회원가입이 되어있는 회원일 경우 로그인
  if (checkPassword[0].exist === 1) {
    const userIdx = await userProvider.getUserId(hashedPassword);

    // //토큰 생성 Service
    // const token = await jwt.sign(
    //   {
    //     userId: userIdx[0].id,
    //   }, // 토큰의 내용(payload)
    //   secret_config.jwtsecret, // 비밀키
    //   {
    //     expiresIn: "365d",
    //     subject: "userInfo",
    //   } // 유효 기간 365일
    // );

    // return res.send(
    //   response(baseResponse.SUCCESS, { userId: userIdx[0].id, jwt: token })
    // );
  }}
