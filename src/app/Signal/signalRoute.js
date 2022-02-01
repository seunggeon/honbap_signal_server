module.exports = function (app) {
    const user = require("./signalController");
    //const jwtMiddleware = require("../../../config/jwtMiddleware");
    //client와 통신 부분.
  
    // 시그널 생성
    app.post("/signal/:userIdx/list", user.postSignal);

};