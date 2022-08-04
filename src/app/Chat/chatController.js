const jwtMiddleware = require("../../../config/jwtMiddleware");
const chatProvider = require("../Chat/chatProvider");
const chatService = require("../Chat/chatService");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const logger = require("../../../config/winston");
const crypto = require("crypto");
const regexEmail = require("regex-email");

//const secret_config = require('secret') // 이거 때문에 Enter text to encrypt 입력창 생성.
const jwt = require("../../../modules/jwt");
const axios = require("axios");
const passport = require("passport");

/**
 * API No. 1
 * API Name : 채팅방 조회 API
 * [GET] /chat/rooms
 */

exports.getRooms = async function (req, res) {
  const userIdxFromJWT = req.verifiedToken.userIdx;

  //validation
  if (!userIdxFromJWT) {
    return res.send(errResponse(baseResponse.USER_USERIDX_EMPTY));  //2042
  }
  if (userIdxFromJWT <= 0) {
    return res.send(errResponse(baseResponse.USER_USERIDX_LENGTH));  //2043
  }

  const getRoomsResponse = await chatProvider.getRooms(userIdxFromJWT);

  return res.send(response(baseResponse.SUCCESS, getRoomsResponse));
};
