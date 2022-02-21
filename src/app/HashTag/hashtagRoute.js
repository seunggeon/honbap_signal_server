module.exports = function (app) {
    // const hashtag = require("./hashtagController");
    
    // 해시태그 생성
    app.post("/hashtag/:userIdx/hash", hashtag.postHashTag);

    // // 해시태그 삭제
    // app.delete("/hashtag/:userIdx/hash", hashtag.deleteHashTag);

    // // 해시태그 조회
    // app.get("/hashtag/:userIdx/hash", hashtag.getHashTag);

    // 해시태그 검색
    app.get("/hashtag/hashlist", hashtag.getHashUser);
    
}
