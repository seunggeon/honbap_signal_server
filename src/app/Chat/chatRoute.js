module.exports = function (app) {
  const chat = require("./chatController");
  const jwtMiddleware = require("../../../config/jwtMiddleware");
  const passport = require("passport");

  //client와 통신 부분.

  // 1. 채팅방 조회 API
  app.get("/chat/rooms", jwtMiddleware, chat.getRooms)

};
