module.exports = function (app) {
    const signal = require("./signalController");
    //const jwtMiddleware = require("../../../config/jwtMiddleware");
    //client와 통신 부분.
  
    // 시그널 생성 1
    app.post("/signal/:userIdx/list", signal.postSignal);

    // 켜져 있는 시그널 확인 2
    app.get("/signal/:userIdx/list", signal.getSignalList);

    // 시그널 수정 3
    app.patch("/signal/:userIdx/list", signal.postSignalList);

    // 시그널 매칭 잡혔을 때 4
    app.patch("/signal/:userIdx/list/matching", signal.postSigMatch);

    // 시그널 OFF 5
    app.patch("/signal/:userIdx/list/off", signal.patchSigStatusOff);

    // 시그널 삭제 6
    app.delete("/signal/:userIdx/list", signal.deleteSignal);

    // 시그널 다시 ON 7
    app.patch("/signal/:userIdx/list/on", signal.patchSigStatusOn);

    // 시그널 신청 목록 조회 8
    app.get("/signal/:userIdx/applylist", signal.getSignalApply);

    // 시그널 신청 9
    app.post("/signal/:userIdx/applylist", signal.postSignalApply);

    // 시그널 신청 취소 10
    app.delete("/signal/:userIdx/applylist", signal.cancelSignalApply);

    // 이전 시그널 조회 11
    app.get("/signal/:userIdx/listed", signal.getEndSignals);

};