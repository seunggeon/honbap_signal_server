module.exports = function (app) {
    const mgs = require("./msgController");
    
    // 쪽지 보내기
    app.post("/msg/수정", msg.msgController);

    // 쪽지 확인 for userIdx
    app.get("msg/수정", msg.msgController);

    // 쪽지 확인 for matchIdx
    app.get("msg/수정", msg.msgController);
};