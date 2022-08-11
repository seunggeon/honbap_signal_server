module.exports = function (app) {
    const report = require("./reportController");

    // 1. 신고 등록
    app.post('/report/:userIdx', report.postReport);
}