module.exports = function (app) {

    const msgController = require("./msgController");
    
    // 쪽지 방 생성
    app.post("/msg", msgController.createMsgRoom);

    // 쪽지 방 확인
    app.get("/msg", msgController.getMsgRoom);

    // 쪽지 보내기
    app.post("/msg/room/:roomId", msgController.sendMsg);
    
    // 쪽지 확인
    app.get("/msg/room/:roomId", msgController.getMsg);

    // 쪽지 방 삭제
    app.delete("/msg", msgController.deleteMsg);
    
};