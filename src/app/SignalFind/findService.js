const { pool } = require("../../../config/database");
const { errResponse } = require("../../../config/response");
const { logger } = require("../../../config/winston");
const baseResponse = require("../../../config/baseResponseStatus");
const { response } = require("../../../config/response");

const findDao = require("./findDao");

exports.createUserLocation = async function (latitude, longitude) {
    try {
        // 쿼리문에 사용할 변수 값을 배열 형태로 전달
        const insertUserLocationParams = [latitude, longitude];
        const connection = await pool.getConnection(async (conn) => conn);
  
        const locationResult = await findDao.insertUserLocation(connection, insertUserLocationParams);
        console.log(`등록된 유저 index : ${locationResult[0].userIdx}`);
        connection.release();
        return response(baseResponse.SUCCESS);
  
    } catch (err) {
        logger.error(`App - createUserLocation Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
  };

  exports.updateLocation = async function(latitude, longitude, userIdx) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);

        const result = await findDao.updateLocation(connection, latitude, longitude, userIdx);

        connection.release();

        return result;
    } catch (err) {
        logger.error(`App - updateLocation Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}