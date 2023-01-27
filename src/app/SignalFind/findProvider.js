const haversine = require('haversine');
const oracledb = require('oracledb');
const { errResponse } = require('../../../config/response');
const { logger } = require('../../../config/winston');
const baseResponse = require('../../../config/baseResponseStatus');
const findDao = require('./findDao');
const database = require('../../../config/database');

exports.getNearSignalONList = async function (userIdx) {
  try {
    const loginUserIdx = userIdx;
    const connection = await oracledb.getConnection(database);

    // JOIN문 사용하기 위해 userIdx 3번 사용
    const params = [loginUserIdx, loginUserIdx, loginUserIdx];
    const signalOnUsers = await findDao.getSignalStatus(connection, params);
    const loginUserLocation = await findDao.getUserLocation(connection, loginUserIdx);
    const onRangeUsers = [];

    signalOnUsers.map(async (signalOnUser) => {
      const siganlOnUsersLocation = await findDao.getUserLocation(connection, signalOnUser.userIdx);
      const distanceBetweenUsers = haversine(loginUserLocation[0], siganlOnUsersLocation[0]);

      if (distanceBetweenUsers < 0 || distanceBetweenUsers > 10) {
        return;
      }
      if (signalOnUser.userIdx !== loginUserIdx) {
        onRangeUsers.push(signalOnUser);
      }
    });
    return onRangeUsers;
  } 
  catch (err) {
    logger.error(`App - get nearby signal ON DB error\n: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  }
};
