module.exports = function (app) {
    const find = require("./findController");

    // 1. 내 위치 전송 API (초깃값)
    app.post('/signalFind',function(req, res){
        find.postMyLocation});

    // 2. 내 위치 업데이트 API
    app.patch('/signalFind/:userIdx',find.patchMyLocation);

    // 3. range에 해당되는 내 근처 시그널 목록 조회 API
    app.get('/signalFind/list/:userIdx', find.getSignalList);
}