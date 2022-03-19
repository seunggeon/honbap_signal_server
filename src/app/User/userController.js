const jwtMiddleware = require("../../../config/jwtMiddleware");
const userProvider = require("../../app/User/userProvider");
const userService = require("../../app/User/userService");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const logger = require("../../../config/winston");
const crypto = require("crypto");
const regexEmail = require("regex-email");

//const secret_config = require('secret') // 이거 때문에 Enter text to encrypt 입력창 생성.
const jwt = require('../../../modules/jwt');
const KakaoStrategy = require("passport-kakao").Strategy;
const axios = require("axios");
const passport = require("passport");

const kakao = {
  clientID: '3a65349851f0c41d0c6038609b178594',
  //clientSecret: 'PwWQHM1dV1cdRLtyyGwmKlu3c3rrRTBv',
  redirectUri: 'http://15.164.98.165/auth/kakao/callback'
}

//controller : 판단 부분.
/**
 * API No. 1
 * API Name : 로그인 API (비회원일 경우 회원가입 후 로그인)
 * [POST] /user/login
 */
 

 exports.signin = async function (req, res) {
  const {userId, password} = req.body;

  const signInResponse = await userService.login(
    userId,
    password
  );

  return res.send(signInResponse);
}


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

  return res.send(baseResponse.SUCCESS);
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
 * [GET] /app/user/signup/:userId
 */

exports.getUserIdx = async function (req, res) {
  const userId = req.params.userId;

  if(!userId) return res.send(errResponse(baseResponse.SIGNUP_USERID_EMPTY));

  const userIdxResponse = await userProvider.getUserIdx(userId);
  return res.send(response(baseResponse.SUCCESS,userIdxResponse));
}

/**
 * API No. 5
 * API Name : 유저 개인정보 조회 API
 * [GET] /app/user/myinfo/:userId
 */
exports.getUserInfo = async function (req, res) {
  const userIdx = req.params.userIdx;

  const userInfoResponse = await userProvider.getUserInfo(userIdx);
  
  return res.send(response(baseResponse.SUCCESS,userInfoResponse));
}

/**
 * API No. 6
 * API Name : 유저 마이페이지(프로필) 조회 API
 * [GET] /app/user/mypage/:userId
 */
 exports.getUserProfile = async function (req, res) {
  const userIdx = req.params.userIdx;

  const userMypageResponse = await userProvider.getUserProfile(userIdx);
  
  return res.send(response(baseResponse.SUCCESS,userMypageResponse));
}

/**
 * API No. 7
 * API Name : 유저 패스워드 수정 API
 * [PATCH] /app/user/myinfo/:userId/modifypw
 */
exports.patchUserPassword = async function (req, res) {
  const userIdx = req.params.userIdx;
  const {password} = req.body;

  const updatePW = await userService.updatePassword(password, userIdx);

  return res.send(baseResponse.SUCCESS);
}

/**
 * API No. 8
 * API Name : 유저 개인정보 수정 API
 * [PATCH] /app/user/myinfo/:userId
 */
exports.patchUserInfo = async function (req, res) {
  const userIdx = req.params.userIdx;
  const {userName, birth} = req.body;

  const updateUserInfo = await userService.updateUserInfo(userName, birth, userIdx);
  return res.send(baseResponse.SUCCESS);
}

/**
 * API No. 9
 * API Name : 유저 프로필 수정 API
 * [PATCH] /app/user/mypage/:userId
 */
 exports.patchUserProfile = async function (req, res) {

  const userIdxFromJwt = req.verifiedToken.userIdx
  const userIdx = req.params.userIdx;
  const {profileImg, taste, hateFood, interest, avgSpeed,
         preferArea, mbti, userIntroduce} = req.body;
  if (userIdxFromJwt == userIdx) {
    const updateUserProfile = await userService.updateUserProfile(
      profileImg, 
      taste, 
      hateFood, 
      interest, 
      avgSpeed,
      preferArea, 
      mbti, 
      userIntroduce,
      userIdx
      );
      
    return res.send(response(baseResponse.SUCCESS));
  }
 }


/*
 * API Name : 카카오 로그인 API
 * [GET] /app/auth/kakao
 */

passport.use(
  "kakao-login",
  new KakaoStrategy(
    {
      clientID: kakao.clientID,
      //clientSecret: kakao.clientSecret,
      callbackURL: kakao.redirectUri,
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(accessToken);
      console.log("-------------------------------------------------------");
      console.log(refreshToken);
      console.log("-------------------------------------------------------");
      console.log(profile);
      console.log("-------------------------------------------------------");
      console.log(done);
      
      kakaoProfile = await axios.get("https://kapi.kakao.com/v2/user/me", {
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
      });

      console.log(kakaoProfile.data.kakao_account);
      // 여기까지 카카오 자체 로그인은 성공. 이제 우리 APP에 로그인이 가능한 지 체크.


      // client와 로그인 유지를 위한 서버의 토큰 발행. 
      // 이거 떄문에 뜨네 ... Enter text to encrypt 생성창
      // 함수 호출안해도 정적 할당 때문에 프로그램 돌아가자마자 다 require 관련된 거 다 호출되나보다.

      let {nickname,email} = kakaoProfile.data.kakao_account.profile;
      var nickName = nickname;
      console.log(`해당 계정의 닉네임은 ${nickName}입니다`);
      
      if(!email){
        console.log("카카오 계정의 이메일을 불러올 수 없습니다.");
        return done(null, false, { message: '이메일 정보가 없어서 로그인에 실패하였습니다.' });
      }
      
      else {
        console.log(`해당 계정의 이메일은 ${email}입니다`);

        const checkEmailExist = await userProvider.emailCheck(email); // 기존 유저 확인 by Email
    
        if(checkEmailExist === 1) {
          //const userId = await userProvider.getUserIdByEmail(email); // 유저 아이디 획득 by Email
          //const loginData = {token, userId};

          console.log("카카오 계정으로 등록된 유저 정보가 DB에 있습니다")

          const user = await userProvider.getUserByUserIdx(email); // email로 idx 얻어오기

          /* user의 idx을 통해 토큰을 생성! */
          const jwtToken = await jwt.sign(user); 

          return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMsg.LOGIN_SUCCESS, 
            {
              /* 생성된 Token을 클라이언트에게 Response */
                token: jwtToken.token
            }))}
          // return done(null, token, { message: '로그인에 성공하였습니다.' }); } 

        else {
          console.log("카카오 계정으로 등록된 유저 정보가 DB에 없습니다. 로그인 불가합니다.")
          return done(null, false, { message: '회원가입이 가능합니다.' });
        }
      }
    }) 
);
