module.exports = function (app) {
    const signal = require("./signalController");
    //const jwtMiddleware = require("../../../config/jwtMiddleware");
    //client와 통신 부분.
  
    // 시그널 생성
    app.post("/signal/:userIdx/list", signal.postSignal);

    // 시그널 확인
    app.get("/signal/:userIdx/list", signal.getSignalList);

};