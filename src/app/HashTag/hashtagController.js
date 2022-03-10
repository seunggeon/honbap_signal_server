const jwtMiddleware = require("../../../config/jwtMiddleware");
const baseResponse = require("../../../config/baseResponseStatus");

const hashtagProvider = require("../../app/HashTag/hashtagProvider");
const hashtagService = require("../../app/HashTag/hashtagService");

const { response, errResponse } = require("../../../config/response");
const logger = require("../../../config/winston");
const crypto = require("crypto");
const regexEmail = require("regex-email");

exports.postHashTag = async function (req, res) {
    const {hashIdx} = req.body;
    const userIdx = req.params.userIdx;
    
    const countHash = await hashtagProvider.countHashTag(userIdx);
    
    if(countHash === 8)
        return res.send(errResponse(baseResponse.HASHTAG_CANT_EXCEED));  // 2018
        
    const postHash = await hashtagService.postHashTag(userIdx, hashIdx);
    
    return res.send(baseResponse.SUCCESS);
}

exports.deleteHashTag = async function (req, res) {
    const {hashIdx} = req.body;
    const userIdx = req.params.userIdx;
    
    const deleteHash = await hashtagService.deleteHashTag(userIdx, hashIdx);

    return res.send(baseResponse.SUCCESS);
}

exports.getHashTag = async function (req, res) {
    const userIdx = req.params.userIdx;

    const getHashTag = await hashtagProvider.getHashTag(userIdx);
    
    return res.send(response(baseResponse.SUCCESS, getHashTag));
}

exports.getHashUser = async function (req, res) {
    const hashTag = req.params.hashTag;

    const getHashUser = await hashtagProvider.getHashTag(hashTag);
    
    return res.send(response(baseResponse.SUCCESS, getHashUser));
}