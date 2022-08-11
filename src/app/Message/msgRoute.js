module.exports = function (app) {
    const msgController = require("./msgController");
    
    // 쪽지 방 생성
    app.post("/msg/:userIdx", msgController.createMsgRoom);

    // 쪽지 보내기
    app.post("/msg/room/:roomId", msgController.sendMsg);

    // 쪽지 확인
    app.get("/msg/roomcheck/:userIdx", msgController.getMsg);

};