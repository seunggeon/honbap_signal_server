const haversine = require('haversine');
const oracledb = require('oracledb');
const { errResponse } = require('../../../config/response');
const { logger } = require('../../../config/winston');
const baseResponse = require('../../../config/baseResponseStatus');
const findDao = require('./findDao');
const database = require('../../../config/database');

function calculateDistnace(loginUserLocation, siganlOnUsersLocation) {
  let loginUser = new Object();
  loginUser.latitude = Object.values(loginUserLocation)[1][0][0];
  loginUser.longitude = Object.values(loginUserLocation)[1][0][1];

  let signalOnUser = new Object();
  signalOnUser.latitude = Object.values(siganlOnUsersLocation)[1][0][0];
  signalOnUser.longitude = Object.values(siganlOnUsersLocation)[1][0][1];
 
  const result = haversine(loginUser, signalOnUser);
  return result;
}

exports.getNearSignalONList = async function (userIdx, Users) {
  try {
    
    const connection = await oracledb.getConnection(database);
    const signalOnUsers = Users;
    const loginUserIdx = [userIdx];
    const loginUserLocation = await findDao.getUserLocation(connection, loginUserIdx);

    
    // logger.info(`signalOnUsers: ${signalOnUsers.map}`);

    // JOIN문 사용하기 위해 userIdx 3번 사용
    // const params = [loginUserIdx, loginUserIdx, loginUserIdx];
    // const signalOnUsers = await findDao.getSignalStatus(connection, params);
    
    let onRangeUsers = [];

    signalOnUsers.map(async (signalOnUser) => {

      const siganlOnUserLocation = await findDao.getUserLocation(connection, [signalOnUser.userIdx]);
      const distanceBetweenUsers = calculateDistnace(loginUserLocation, siganlOnUserLocation);
  
      if (distanceBetweenUsers > 0 && distanceBetweenUsers < 10) {
        if (signalOnUser.userIdx !== loginUserIdx){
          const result = new Object;
          result.userIdx = signalOnUser.userIdx;
          result.distance = distanceBetweenUsers;
          // result.signalCreatedAt = signalOnUser.시그널생성시간;
          onRangeUsers.push(result);
        } 
      }
    });
    return onRangeUsers;
  } catch (err) {
    logger.error(`App - get nearby signal ON DB error\n: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  }
};


