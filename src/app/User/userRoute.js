module.exports = function (app) {
    const user = require("./userController");
    //const jwtMiddleware = require("../../../config/jwtMiddleware");
    //client와 통신 부분.
  
    // 1. 로그인 API (비회원일 경우 회원가입 후 로그인)
    app.post("/user/login", user.createUser);

    // 2. 회원가입 (유저 개인정보) API
    app.post("/user/signup", user.postUsers);

    // 3. 유저 프로필 등록 API
    app.post("/user/signup/plusinfo", user.postUserProfile);

    // 4. 유저 인덱스 조회 API
    app.get("/user/signup/:userId", user.getUserIdx);

    // 5. 유저 개인정보 조회 API
    app.get("/user/myinfo/:userIdx", user.getUserInfo);

    // 6. 유저 프로필 조회 (마이페이지) API
    app.get("/user/mypage/:userIdx", user.getUserProfile);

    // 7. 유저 패스워드 수정 API
    app.patch("/user/myinfo/:userIdx/modifypw", user.patchUserPassword);

    // 8. 유저 개인정보 수정 API
    app.patch("/user/userinfo/:userIdx", user.patchUserInfo);

    // 9. 유저 프로필 수정 (마이페이지) API
    app.patch("/user/mypage/:userIdx", user.patchUserProfile);

    // 10. 카카오 로그인 API
    app.get('/auth/kakao', passport.authenticate('kakao-login')); 
    app.get('/auth/kakao/callback', passport.authenticate('kakao-login', { failureRedirect: '/user/login', successRedirect: '/home' }));


};