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
 * API Name : 시그널 등록 API
 * [POST] /user/login
 */
exports.postSignal = async function (req, res) {
    const userIdx = req.params.userIdx
    const {matchIdx, sigPromiseTime, sigPromiseArea} = req.body;
    
    if(!sigPromiseArea)
        return res.send(response(baseResponse.SIGNAL_AREA_EMPTY));
    if(!sigPromiseTime)
        return res.send(response(baseResponse.SIGNAL_TIME_EMPTY));

    const signalup = await signalService.createSignal(
        userIdx, matchIdx, sigPromiseTime, sigPromiseArea
    );

    return res.send(baseResponse.SUCCESS);
}

/**
 * API No. 
 * API Name : 시그널 조회 API
 * [POST] /user/login
 */
exports.getSignalList = async function (req, res) {
    const userIdx = req.params.userIdx;
    const result = await signalProvider.getSignalList(userIdx);
    return res.send(response(baseResponse.SUCCESS, result));
} 

/**
 * API No. 
 * API Name : 시그널 정보 수정 API
 * [POST] /user/login
 */
exports.postSignalList = async function(req, res) {
    const userIdx = req.params.userIdx;
    const {sigPromiseTime, sigPromiseArea, sigStart} = req.body;

    const modifySigList = await signalService.modifySigList(
        sigPromiseTime,
        sigPromiseArea,
        sigStart,
        userIdx
    )
    return res.send(baseResponse.SUCCESS);
}

/**
 * API No. 
 * API Name : 시그널 매칭 잡힘 API
 * [POST] /signal/:userIdx/list/matching
 */
exports.postSigMatch = async function (req, res) {
    const userIdx = req.params.userIdx;
    const {matchIdx} = req.body;

    const matching = await signalService.matching(
        matchIdx, userIdx
    )
    return res.send(baseResponse.SUCCESS);
}

/**
 * API No. 
 * API Name : 시그널 OFF API
 * [PATCH] /signal/:userIdx/list/off
 */
exports.patchSigStatusOff = async function (req, res) {
    const userIdx = req.params.userIdx;
    
    const signalOff = await signalService.signalOff(userIdx);
    return res.send(baseResponse.SUCCESS);
}

/**
 * API No. 
 * API Name : 시그널 삭제 API
 * [DELETE] /signal/:userIdx/lis
 */
exports.deleteSignal = async function (req, res) {
    const userIdx = req.params.userIdx;
    const {signalIdx} = req.body;

    const deleteSignal = await signalService.deleteSignalList(signalIdx, userIdx);
    return res.send(baseResponse.SUCCESS);
}

/**
 * API No. 
 * API Name : 시그널 등록 API
 * [PATCH] /signal/:userIdx/list/on
 */
exports.patchSigStatusOn = async function (req, res) {
    const userIdx = req.params.userIdx;
    
    const signalOn = await signalService.signalOn(userIdx);
    return res.send(baseResponse.SUCCESS);
}

/**
 * API No. 
 * API Name : 시그널 신청 목록 조회 API
 * [GET] /signal/:userIdx/applylist
 */
 exports.getSignalApply = async function (req, res) {
    const userIdx = req.params.userIdx;
    
    const result = await signalProvider.getSignalApply(userIdx);
    return res.send(response(baseResponse.SUCCESS, result));
}

/**
 * API No. 
 * API Name : 시그널 신청 API
 * [POST] /signal/:userIdx/applylist
 */
 exports.postSignalApply = async function (req, res) {
    const userIdx = req.params.userIdx;
    const {signalIdx, applyedIdx} = req.body;

    const apply = await signalService.signalApply(
        signalIdx, applyedIdx, userIdx
    )
    
    return res.send(baseResponse.SUCCESS);
}

/**
 * API No. 
 * API Name : 시그널 신청 취소 API
 * [DELETE] /signal/:userIdx/applylist
 */
exports.cancelSignalApply = async function (req, res) {
    const userIdx = req.params.userIdx;
    const {applyedIdx} = req.body;

    const cancelSignal = await signalService.cancelSignalApply(applyedIdx, userIdx);
    return res.send(baseResponse.SUCCESS);
}

/**
 * API No. 
 * API Name : 이전 시그널 조회 API
 * [GET] /signal/:userIdx/listed
 */
exports.getEndSignals = async function (req, res) {
    const userIdx = req.params.userIdx;
    const userIdx2 = req.params.userIdx;

    const endSignals = await signalProvider.endSignals(userIdx, userIdx2);
    return res.send(response(baseResponse.SUCCESS, endSignals));
}