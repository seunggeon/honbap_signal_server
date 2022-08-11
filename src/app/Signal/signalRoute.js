module.exports = function (app) {
    const signal = require("./signalController");
    const jwtMiddleware = require("../../../config/jwtMiddleware");
    //client와 통신 부분.
  
    // 시그널 생성 1 -> 회원가입 완료 후 바로 생성
    app.post("/signal/list", jwtMiddleware, signal.postSignal);

    // 켜져 있는 시그널 확인 2
    app.get("/signal/list", jwtMiddleware, signal.getSignalList);

    // 시그널 수정 3
    app.patch("/signal/list", jwtMiddleware, signal.postSignalList);

    // 시그널 매칭 잡혔을 때 4
    app.patch("/signal/list/matching", jwtMiddleware, signal.postSigMatch);

    // 시그널 OFF 5
    app.patch("/signal/list/off", jwtMiddleware, signal.patchSigStatusOff);

    // 시그널 삭제 6
    app.delete("/signal/list", jwtMiddleware, signal.deleteSignal);

    // 시그널 다시 ON 7
    app.patch("/signal/list/on", jwtMiddleware, signal.patchSigStatusOn);

    // 시그널 신청 목록 조회 8
    app.get("/signal/applylist", jwtMiddleware, signal.getSignalApply);

    // 시그널 신청 9
    app.post("/signal/applylist", jwtMiddleware, signal.postSignalApply);

    // 시그널 신청 취소 10
    app.delete("/signal/applylist", jwtMiddleware, signal.cancelSignalApply);

    // 이전 시그널 조회 11
    app.get("/signal/listed", jwtMiddleware, signal.getEndSignals);

    // 주황색 유저를 위한 Signal Promise 및 time 수정
    app.patch("/signal/list/orange", jwtMiddleware, signal.patchSignalContents);

};