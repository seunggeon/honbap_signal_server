const { errResponse } = require("../../../config/response");
const { logger } = require("../../../config/winston");
const baseResponse = require("../../../config/baseResponseStatus");

const findDao = require("./findDao");
const haversine = require('haversine');
const pool = require("../../../config/database");

exports.getNearSignalONList = async function (userIdx) 
{
    try 
    {
      let loginUserIdx = userIdx;
      const connection = await pool.getConnection(async (conn) => conn);

      // JOIN문 사용하기 위해 userIdx 3번 사용
      const params = [loginUserIdx, loginUserIdx, loginUserIdx];
      const signalOnUsersList = await findDao.getSignalStatus(connection, params);
      const loginUserLocation = await findDao.selectUserLocation(connection, loginUserIdx);
    
      console.log(`myLocation ${loginUserLocation[0].latitude}, ${loginUserLocation[0].longitude}`);

      let userOnRangeList = [];

      for(let i of signalOnUsersList)
      {
        let siganlOnUsersLocation  = await findDao.selectSignalLocation(connection, signalOnUsersList[i].loginUserIdx); 
        let distanceBetweenUsers = haversine(loginUserLocation[0], siganlOnUsersLocation[0]);

        if(distanceBetweenUsers > 0 && distanceBetweenUsers < 10)
        {
          if(signalOnUsersList[i].userIdx != loginUserIdx) userOnRangeList.push(signalOnUsersList[i]);
        }
        else
        {
          console.log(`10km 거리에 존재하지 않는 시그널 userIdx는 ${signalOnUsersList[i].userIdx} 입니다.`);
        }
      }
      return userOnRangeList;
    }
    catch (err) 
    {
      logger.error(`App - get nearby signal ON DB error\n: ${err.message}`);
      return errResponse(baseResponse.DB_ERROR);
    }
    
}