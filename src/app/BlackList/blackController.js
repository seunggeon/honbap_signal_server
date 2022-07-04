const jwtMiddleware = require("../../../config/jwtMiddleware");
const baseResponse = require("../../../config/baseResponseStatus");

const blackProvider = require("../../app/BlackList/blackProvider");
const blackService = require("../../app/BlackList/blackService");

const { response, errResponse } = require("../../../config/response");
const logger = require("../../../config/winston");
const crypto = require("crypto");
const regexEmail = require("regex-email");

// 블랙리스트 입력
exports.postBlackList = async function (req, res) {
    const userIdx = req.params.userIdx;
    const {blackIdx, whyBlack} = req.body;

    const checkBlackIdx = await blackProvider.checkBlackIdx(userIdx, blackIdx);
    if(checkBlackIdx > 0)
        return res.send(errResponse(baseResponse.BLACK_ALREADY_EXIST));     // 2019

    const postBlack = await blackService.postBlackList(userIdx, blackIdx, whyBlack);
    return res.send(baseResponse.SUCCESS);
}

// 블랙리스트 삭제
exports.deleteBlackList = async function (req, res) {
    const userIdx = req.params.userIdx;
    const {blackIdx} = req.body;

    const deleteResult = await blackService.deleteBlackList(userIdx, blackIdx);
    return res.send(baseResponse.SUCCESS);
}

// 블랙리스트 리스트 가져오기
exports.getBlackList = async function (req, res) {
    const userIdx = req.params.userIdx;
    const getListResult = await blackProvider.getBlackList(userIdx);
    return res.send(response(baseResponse.SUCCESS, getListResult));
}

// 블랙리스트 상세 정보 가져오기
exports.getBlackPlus = async function (req, res) {
    const userIdx = req.params.userIdx;
    const {blackIdx} = req.body;
    const getListPlusResult = await blackProvider.getBlackPlus(userIdx, blackIdx);
    return res.send(response(baseResponse.SUCCESS, getListPlusResult));
}