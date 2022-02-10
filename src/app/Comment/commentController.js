const jwtMiddleware = require("../../../config/jwtMiddleware");
const baseResponse = require("../../../config/baseResponseStatus");

const commentProvider = require("../../app/Comment/commentProvider");
const commentService = require("../../app/Comment/commentService");

const { response, errResponse } = require("../../../config/response");
const logger = require("../../../config/winston");
const crypto = require("crypto");
const regexEmail = require("regex-email");


/**
 * API No. 
 * API Name : 후기 등록 API
 * [POST] /comment/newcomment
 */
 exports.createComment = async function (req, res) {

    const {signalIdx, userIdx, writerIdx, comment, star} = req.body;
    
    if(!comment)
        return res.send(response(baseResponse.COMMENT_EMPTY)); // 2014
    if(comment.length < 5)
        return res.send(response(baseResponse.COMMENT_LENGTH)); // 2015

    const NewComment = await commentService.createComment(
        signalIdx, userIdx, writerIdx, comment, star
    );

    return res.send(NewComment);
}

/**
 * API No. 
 * API Name : 내게 써진 후기 조회 API
 * [GET] /comment/commented/:userIdx
 */
exports.getCommented = async function (req, res) {
    const userIdx = req.params.userIdx;
    
    const result = await commentProvider.getCommentedList(userIdx);
    res.send(response(baseResponse.SUCCESS, result));
}

/**
 * API No. 
 * API Name : 내가 쓴 후기 조회 API
 * [GET] /comment/commenting/:userIdx
 */
 exports.getCommenting = async function (req, res) {
    const writerIdx = req.params.userIdx;
    
    const result = await commentProvider.getCommentingList(writerIdx);
    res.send(response(baseResponse.SUCCESS, result));
}