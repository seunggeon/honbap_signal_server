module.exports = function (app) {
    const blacklist = require("./blackController");

    // 블랙리스트 입력
    app.post("/blacklist/:userIdx/black", blacklist.postBlackList);

    // 블랙리스트 삭제
    app.delete("/blacklist/:userIdx/black", blacklist.deleteBlackList);

    // 블랙리스트 조회
    app.get("/blacklist/:userIdx/black", blacklist.getBlackList);

    // 블랙 자세히 보기
    app.get("/blacklist/:userIdx/black/plus", blacklist.getBlackPlus);

};