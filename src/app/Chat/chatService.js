const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') })
const { logger } = require("../../../config/winston");
const { pool } = require("../../../config/database");
// const secret_config = require("../../../config/secret");
// const secret_config = require()

const jwtsecret = process.env.JWTSECRET

// const chatProvider = require("./chatProvider")
const chatDao = require("./chatDao");

const baseResponse = require("../../../config/baseResponseStatus");
const { response } = require("../../../config/response");
const { errResponse } = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { connect } = require("http2");

// Service: Create, Update, Delete 비즈니스 로직 처리

// 채팅방 생성
exports.createChatRoom = async function (userIdx, matchIdx) {
    try {
      const roomName = userIdx + '_' + matchIdx;
      console.log(roomName)

      const params = [userIdx, matchIdx, roomName];

      const connection = await pool.getConnection(async (conn) => conn);

      const createChatRoom = await chatDao.createChatRoom(connection, params);

      connection.release();
      return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - createChatRoom Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};
