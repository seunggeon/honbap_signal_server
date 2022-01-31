const jwtMiddleware = require("../../../config/jwtMiddleware");
const userProvider = require("../../app/User/userProvider");
const userService = require("../../app/User/userService");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const logger = require("../../../config/winston");
const crypto = require("crypto");
const regexEmail = require("regex-email");
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


/**
 * API No. 2
 * API Name : 유저 생성 (회원가입) API
 * [POST] /app/user/signup
 */

exports.postUsers = async function (req, res) {
  const {userId, password, userName, birth, email, phoneNum, sex} = req.body;
  // userId checking and print error message

  // 빈 값 체크
  if(!userId)
    return res.send(response(baseResponse.SIGNUP_USERID_EMPTY));
  // 길이 체크
  if(userId.length > 20 || userId.length < 5)
    return res.send(response(baseResponse.SIGNUP_USERID_LENGTH));

  // email

  // 빈 값 체크
  if (!email)
    return res.send(response(baseResponse.SIGNUP_EMAIL_EMPTY));
  // 길이 체크
  if (email.length > 30)
    return res.send(response(baseResponse.SIGNUP_EMAIL_LENGTH));
  // 형식 체크 (by 정규표현식)
  if (!regexEmail.test(email))
    return res.send(response(baseResponse.SIGNUP_EMAIL_TYPE_ERROR));

  // phoneNum

  // 빈 값 체크
  if(!phoneNum)
    return res.send(response(baseResponse.SIGNUP_PHONENUMBER_EMPTY));
  // 길이체크
  if(phoneNum.length > 11)
    return res.send(response(baseResponse.SIGNUP_PHONENUMBER_LENGTH));

  // 빈 값 체크
  if(!password)
    return res.send(response(baseResponse.SIGNUP_PASSWORD_EMPTY));  // 2010
  if(!userName)
    return res.send(response(baseResponse.SIGNUP_USERNAME_EMPTY));  // 2011
  if(!birth)
    return res.send(response(baseResponse.SIGNUP_BIRTH_EMPTY));     // 2012
  if(!sex)
    return res.send(response(baseResponse.SIGNUP_SEX_EMPTY));       // 2013
  
  
  const signUpResponse = await userService.createUsers(
    userId,
    password,
    userName,
    birth,
    email,
    phoneNum,
    sex
  );

  return res.send(signUpResponse);
}

/**
 * API No. 3
 * API Name : 유저 프로필 등록 API
 * [POST] /app/user/signup/plusInfo
 */

exports.postUserProfile = async function (req, res) {
  const {userIdx, nickName, profileImg, taste, hateFood, interest, avgSpeed, preferArea, mbti, userIntroduce} = req.body;
  // userId checking and print error message

  // nickName
  // 빈 값 체크
  if(!nickName)
    return res.send(response(baseResponse.SIGNUP_NICKNAME_EMPTY));
  if(nickName.length > 10)
    return res.send(response(baseResponse.SIGNUP_NICKNAME_LENGTH));

  const userProfileResponse = await userService.createUserProfile(
    userIdx,
    nickName,
    profileImg,
    taste,
    hateFood,
    interest,
    avgSpeed,
    preferArea,
    mbti,
    userIntroduce
  );

  return res.send(userProfileResponse);
}

/**
 * API No. 4
 * API Name : 유저 인덱스 조회 API
 * [POST] /app/user/signup/:userId
 */

exports.getUserIdx = async function (req, res) {
  const userId = req.params.userId;

  if(!userId) return res.send(errResponse(baseResponse.SIGNUP_USERID_EMPTY));

  const userIdxResponse = await userProvider.getUserIdx(userId);
  return res.send(userIdxResponse);
}