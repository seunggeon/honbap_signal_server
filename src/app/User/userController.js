const jwtMiddleware = require("../../../config/jwtMiddleware");
const userProvider = require("../../app/User/userProvider");
const userService = require("../../app/User/userService");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const logger = require("../../../config/winston");
const crypto = require("crypto");
const regexEmail = require("regex-email");

const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;
const axios = require("axios");

const kakao = {
  clientID: '3a65349851f0c41d0c6038609b178594',
  //clientSecret: 'PwWQHM1dV1cdRLtyyGwmKlu3c3rrRTBv',
  redirectUri: 'http://127.0.0.1:3001/auth/kakao/callback'
}

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
  
  return res.send(userInfoResponse);
}

/**
 * API No. 6
 * API Name : 유저 마이페이지(프로필) 조회 API
 * [GET] /app/user/mypage/:userId
 */
 exports.getUserProfile = async function (req, res) {
  const userIdx = req.params.userIdx;

  const userMypageResponse = await userProvider.getUserProfile(userIdx);
  
  return res.send(userMypageResponse);
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
  const userIdx = req.params.userIdx;
  const {profileImg, taste, hateFood, interest, avgSpeed,
         preferArea, mbti, userIntroduce} = req.body;

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

      const token = await jwt.sign(
        {
          userId: userIdx[0].id,
        }, // 토큰의 내용(payload)
        secret_config.jwtsecret, // 비밀키
        {
          expiresIn: "365d",
          subject: "userInfo",
        } // 유효 기간 365일
      );
      //client와 로그인 유지를 위한 서버의 토큰 발행.

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
          return done(null, token, { message: '로그인에 성공하였습니다.' }); } 

        else {
          console.log("카카오 계정으로 등록된 유저 정보가 DB에 없습니다. 로그인 불가합니다.")
          return done(null, false, { message: '회원가입이 가능합니다.' });
        }
      }
    }) 
);
