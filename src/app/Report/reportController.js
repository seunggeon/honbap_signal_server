const jwtMiddleware = require("../../../config/jwtMiddleware");
const baseResponse = require("../../../config/baseResponseStatus");

//const reportProvider = require("../../app/Signal/signalProvider");
const reportService = require("../../app/Report/reportService");

const { response, errResponse } = require("../../../config/response");
const logger = require("../../../config/winston");
const crypto = require("crypto");
const regexEmail = require("regex-email");

exports.postReport = async function (req, res) {
    const userIdx = req.params.userIdx
    const {reportedIdx, shortReason, specificReason} = req.body;

    const signalup = await reportService.createReport(
        userIdx, reportedIdx, shortReason, specificReason
    );

    return res.send(baseResponse.SUCCESS);
}