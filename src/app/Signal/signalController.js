const jwtMiddleware = require("../../../config/jwtMiddleware");
const baseResponse = require("../../../config/baseResponseStatus");

const signalProvider = require("../../app/Signal/signalProvider");
const signalService = require("../../app/Signal/signalService");

const { response, errResponse } = require("../../../config/response");
const logger = require("../../../config/winston");
const crypto = require("crypto");
const regexEmail = require("regex-email");
//controller : 판단 부분.

/**
 * API No. 
 * API Name : 로그인 API (비회원일 경우 회원가입 후 로그인)
 * [POST] /user/login
 */
exports.postSignal = async function (req, res) {

    const {userIdx, matchIdx, sigPromiseTime, sigPromiseArea} = req.body;
    
    if(!sigPromiseArea)
        return res.send(response(baseResponse.SIGNUP_USERID_EMPTY));
    if(!sigPromiseTime)
        return res.send(response(baseResponse.SIGNUP_USERID_EMPTY));

    const signalup = await signalService.createSignal(
        userIdx, matchIdx, sigPromiseTime, sigPromiseArea
    );

    return res.send(signalup);
}