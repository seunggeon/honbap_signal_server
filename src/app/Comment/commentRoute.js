module.exports = function (app) {
    const comment = require("./commentController");
    //const jwtMiddleware = require("../../../config/jwtMiddleware")

    // 후기 등록 API
    app.post("/comment/newcomment", comment.createComment);

    // 내게 써진 후기 조회 API
    app.get("/comment/commented/:userIdx", comment.getCommented);

    // 내가 쓴 후기 조회 API
    app.get("/comment/commenting/:userIdx", comment.getCommenting);


}

