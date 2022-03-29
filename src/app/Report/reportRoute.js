module.exports = function (app) {
    const report = require("./reportController");

    // 1. 신고 등록
    app.post('/report', report.postReport);

    // 2. 신고 조회
    app.patch('/signalFind/:userIdx',find.patchMyLocation);

    // 3. range에 해당되는 내 근처 시그널 목록 조회 API
    app.get('/signalFind/list/:userIdx', find.getSignalList);
}