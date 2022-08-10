const jwtMiddleware = require("../../../config/jwtMiddleware");
const baseResponse = require("../../../config/baseResponseStatus");

const msgProvider = require("../../app/Message/msgProvider");
const msgService = require("../../app/Message/msgService");

const { response, errResponse } = require("../../../config/response");


exports.getMsg = async function (req, res) {
  const userIdxFromJWT = req.params.userIdx;
  const roomId = req.body.roomId;

  const arr = roomId.split("_");
  const userIdx = arr[0];
  const matchIdx = arr[1];


  // 보낸/받는 사람 구별
  if (userIdxFromJWT == userIdx) {
    const sender = userIdx;
    const receiver = matchIdx;

    const result = await msgProvider.getMsg(roomId, sender, receiver);
    return res.send(response(baseResponse.SUCCESS, result));
  }
  else if (userIdxFromJWT == matchIdx) {
    const sender = matchIdx;
    const receiver = userIdx;

    const result = await msgProvider.getMsg(roomId, sender, receiver);
    return res.send(response(baseResponse.SUCCESS, result));
  }

};

// 채팅방 생성
exports.createMsgRoom = async function (req, res) {
  const userIdx = req.params.userIdx;    // 나중에 jwt로 변경
  const matchIdx = req.body.matchIdx;

  const roomId = userIdx + '_' + matchIdx;

  const result = await msgService.createMsgRoom(userIdx, matchIdx, roomId);
  return res.send(baseResponse.SUCCESS);
}

// 채팅 보내기
exports.sendMsg = async function (req, res) {
  const roomId = req.params.roomId;
  const {senderIdx, text} = req.body;

  const result = await msgService.sendMsg(roomId, senderIdx, text);
  return res.send(baseResponse.SUCCESS);
}