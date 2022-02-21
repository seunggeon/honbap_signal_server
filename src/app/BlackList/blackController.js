const jwtMiddleware = require("../../../config/jwtMiddleware");
const baseResponse = require("../../../config/baseResponseStatus");

const blackProvider = require("../../app/BlackList/blackProvider");
const blackService = require("../../app/BlackList/blackService");

const { response, errResponse } = require("../../../config/response");
const logger = require("../../../config/winston");
const crypto = require("crypto");
const regexEmail = require("regex-email");


exports.postBlackList = async function (req, res) {
    const userIdx = req.params.userIdx;
    const {blackIdx, whyBlack} = req.body;

    const postBlack = await blackService.postBlackList(userIdx, blackIdx, whyBlack);
    return res.send(baseResponse.SUCCESS);
}

exports.deleteBlackList = async function (req, res) {
    const userIdx = req.params.userIdx;
    const {blackIdx} = req.body;

    const deleteResult = await blackService.deleteBlackList(userIdx, blackIdx);
    return res.send(baseResponse.SUCCESS);
}

exports.getBlackList = async function (req, res) {
    const userIdx = req.params.userIdx;
    const getListResult = await blackProvider.getBlackList(userIdx);
    return res.send(response(baseResponse.SUCCESS, getListResult));
}

exports.getBlackPlus = async function (req, res) {
    const userIdx = req.params.userIdx;
    const {blackIdx} = req.body;
    const getListPlusResult = await blackProvider.getBlackPlus(userIdx, blackIdx);
    return res.send(response(baseResponse.SUCCESS, getListPlusResult));
}