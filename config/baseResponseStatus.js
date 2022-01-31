module.exports = {
    // Success
    SUCCESS: { isSuccess: true, code: 1000, message: "성공" },
  
    // Common
    TOKEN_EMPTY: {
      isSuccess: false,
      code: 2000,
      message: "JWT 토큰을 입력해주세요.",
    },
    TOKEN_VERIFICATION_FAILURE: {
      isSuccess: false,
      code: 3000,
      message: "JWT 토큰 검증 실패",
    },
    TOKEN_VERIFICATION_SUCCESS: {
      isSuccess: true,
      code: 1001,
      message: "JWT 토큰 검증 성공",
    }, // ?
  
    //Request error
    SIGNUP_USERID_EMPTY: {
      isSuccess: false,
      code: 2001,
      message: "아이디를 입력해주세요.",
    },
    SIGNUP_USERID_LENGTH: {
      isSuccess: false,
      code: 2002,
      message: "아이디는 5~20자 이내로 입력해주세요.",
    },
    SIGNUP_NICKNAME_EMPTY: {
      isSuccess: false,
      code: 2003,
      message: "닉네임을 입력해주세요.",
    },
    SIGNUP_NICKNAME_LENGTH: {
      isSuccess: false,
      code: 2004,
      message: "닉네임은 10자 이내로 입력해주세요.",
    },
    SIGNUP_EMAIL_EMPTY: {
      isSuccess: false,
      code: 2005,
      message: "이메일을 입력해주세요.",
    },
    SIGNUP_EMAIL_LENGTH: {
      isSuccess: false,
      code: 2006,
      message: "이메일은 30자 이내로 입력해주세요.",
    },
    SIGNUP_EMAIL_TYPE_ERROR: {
      isSuccess: false,
      code: 2007,
      message: "이메일의 형식이 잘못되었습니다.",
    },
    SIGNUP_PHONENUMBER_EMPTY: {
      isSuccess: false,
      code: 2008,
      message: "핸드폰 번호를 입력해주세요.",
    },
    SIGNUP_PHONENUMBER_LENGTH: {
      isSuccess: false,
      code: 2009,
      message: "핸드폰 번호는 11자 이내로 입력해주세요.",
    },
    SIGNUP_PASSWORD_EMPTY: {
      isSuccess: false,
      code: 2010,
      message: "비밀번호를 입력해주세요.",
    },
    SIGNUP_USERNAME_EMPTY: {
      isSuccess: false,
      code: 2011,
      message: "이름을 입력해주세요.",
    },
    SIGNUP_BIRTH_EMPTY: {
      isSuccess: false,
      code: 2012,
      message: "생년월일을 입력해주세요.",
    },
    SIGNUP_SEX_EMPTY: {
      isSuccess: false,
      code: 2013,
      message: "성별을 입력해주세요.",
    },
    CATEGORY_IS_NOT_EXIST: {
      isSuccess: false,
      code: 2014,
      message: "존재하지 않는 카테고리입니다.",
    },
    USERID_IS_NOT_HOST: {
      isSuccess: false,
      code: 2015,
      message: "해당 상품에 접근할 수 없습니다.",
    },
    MANNER_IS_NOT_EXIST: {
      isSuccess: false,
      code: 2016,
      message: "존재하지 않는 매너가 포함되어 있습니다.",
    },
    BADGE_IS_NOT_EXIST: {
      isSuccess: false,
      code: 2017,
      message: "존재하지 않는 배지 입니다.",
    },
    BADGE_IS_NOT_GOLD: {
      isSuccess: false,
      code: 2018,
      message: "황금배지만 대표배지로 설정할 수 있습니다.",
    },
    BADGE_IS_NOT_ACHEIVED: {
      isSuccess: false,
      code: 2019,
      message: "획득하지 못한 배지입니다.",
    },
    BADGE_IS_ALREADY_MAIN: {
      isSuccess: false,
      code: 2020,
      message: "해당 배지는 이미 대표 배지로 설정되어 있습니다.",
    },
    STATUS_IS_NOT_VALID: {
      isSuccess: false,
      code: 2021,
      message: "status가 올바르지 않습니다.",
    },
    CHATROOM_IS_NOT_EXIST: {
      isSuccess: false,
      code: 2022,
      message: "존재하지 않는 채팅방입니다.",
    },
    NOT_IN_ROOM_MEMBER: {
      isSuccess: false,
      code: 2023,
      message: "해당 채팅방에 속해있는 유저가 아닙니다.",
    },
    MERCHANDISE_ALREADY_HIDE_ON: {
      isSuccess: false,
      code: 2024,
      message: "해당 상품은 이미 숨기기 상태입니다.",
    },
    MERCHANDISE_ALREADY_HIDE_OFF: {
      isSuccess: false,
      code: 2025,
      message: "해당 상품은 이미 숨기기 상태가 아닙니다.",
    },
    USER_IS_NOT_EXIST: {
      isSuccess: false,
      code: 2026,
      message: "해당 유저는 존재하지 않습니다.",
    },
    PAGE_IS_EMPTY: {
      isSuccess: false,
      code: 2027,
      message: "page를 입력해주세요.",
    },
    PAGE_FORM_IS_NOT_CORRECT: {
      isSuccess: false,
      code: 2028,
      message: "page 형식이 올바르지 않습니다.",
    },
    SIZE_IS_EMPTY: {
      isSuccess: false,
      code: 2029,
      message: "size를 입력해주세요.",
    },
    SIZE_FORM_IS_NOT_CORRECT: {
      isSuccess: false,
      code: 2030,
      message: "size 형식이 올바르지 않습니다.",
    },
    SELECT_ID_FORM_IS_NOT_CORRECT: {
      isSuccess: false,
      code: 2031,
      message: "selectedId 형식이 올바르지 않습니다.",
    },
    MERCHANDISE_ID_FORM_IS_NOT_CORRECT: {
      isSuccess: false,
      code: 2032,
      message: "merchandiseId 형식이 올바르지 않습니다.",
    },
    LOCATION_ID_FORM_IS_NOT_CORRECT: {
      isSuccess: false,
      code: 2033,
      message: "locationId 형식이 올바르지 않습니다.",
    },
    CATEGORY_ID_FORM_IS_NOT_CORRECT: {
      isSuccess: false,
      code: 2034,
      message: "categoryId 형식이 올바르지 않습니다.",
    },
    ROOM_ID_FORM_IS_NOT_CORRECT: {
      isSuccess: false,
      code: 2035,
      message: "roomId 형식이 올바르지 않습니다.",
    },
    BADGE_ID_FORM_IS_NOT_CORRECT: {
      isSuccess: false,
      code: 2036,
      message: "badgeId 형식이 올바르지 않습니다.",
    },
    AUTH_NUM_FORM_IS_NOT_CORRECT: {
      isSuccess: false,
      code: 2037,
      message: "인증번호 형식이 올바르지 않습니다.",
    },
    AUTHOR_ID_FORM_IS_NOT_CORRECT: {
      isSuccess: false,
      code: 2038,
      message: "authorId 형식이 올바르지 않습니다.",
    },
    REVIEW_ID_FORM_IS_NOT_CORRECT: {
      isSuccess: false,
      code: 2039,
      message: "reviewId 형식이 올바르지 않습니다.",
    },
  
    // Response error
    SIGNUP_REDUNDANT_USERID : { 
      isSuccess : false, 
      code : 3001, 
      message :"이미 존재하는 아이디입니다." },
    SIGNUP_REDUNDANT_NICKNAME : { 
      isSuccess : false, 
      code : 3002, 
      message :"이미 존재하는 닉네임입니다." },
    SIGNUP_REDUNDANT_EMAIL : { 
      isSuccess : false, 
      code : 3003, 
      message :"이미 존재하는 이메일입니다." },
    SIGNUP_REDUNDANT_PHONENUMBER : { 
      isSuccess : false, 
      code : 3004, 
      message :"이미 존재하는 번호입니다." },
  

    MODIFY_REDUNDANT_NICKNAME: {
      isSuccess: false,
      code: 3050,
      message: "이미 존재하는 닉네임입니다.",
    },
  
    //Connection, Transaction 등의 서버 오류
    DB_ERROR: { isSuccess: false, code: 4000, message: "데이터 베이스 에러" },
    SERVER_ERROR: { isSuccess: false, code: 4001, message: "서버 에러" },
  };
  