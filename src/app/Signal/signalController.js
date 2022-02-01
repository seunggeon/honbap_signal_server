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
 * API Name : 로그인 API
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

/**
 * API No. 
 * API Name : 시그널 조회 API
 * [POST] /user/login
 */
exports.getSignalList = async function (req, res) {
    const userIdx = req.params.userIdx;

    const signalList = await signalProvider.getSignalList(userIdx);
    return res.send(signalList);
} 