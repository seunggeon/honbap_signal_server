const { pool } = require("../../../config/database");
const { errResponse } = require("../../../config/response");
const { logger } = require("../../../config/winston");
const baseResponse = require("../../../config/baseResponseStatus");

const findDao = require("./findDao");
const haversine = require('haversine');

exports.getSignalList= async function (userIdx) {
    try {
      const connection = await pool.getConnection(async (conn) => conn);

      // userLocation Table에서 내 최신 위치 정보 불러오기 
      const myLocationResult = await findDao.selectUserLocation(connection, userIdx);

      console.log(`myLocationResult ${myLocationResult[0].latitude}, ${myLocationResult[0].longitude}`);
  
      // Siganling Table에서 활성화된 시그널의 SignalArea 정보 가져오기
      const signalPromiseArea = await findDao.selectSignalLocation(connection);
      console.log(`signalPromiseArea ${signalPromiseArea[2].sigPromiseArea}`);
      // ARzone Table에서 위도, 경도 받아오기
      
      /* 전역 변수 선언 */
      var arLocation = []; // 활성화된 매칭 주소의 경도와 위도 저장.
      var arLocationResult = {
        "latitude" : 0,
        "longitude" : 0
      };
      var matchingAddress = []; // 내 근처 시그널의 매칭장소 

      // address = ? 에서 for문 안쓰면 주소 여러개 중에 하나만 받고 끝남.
      for(var i=0; i <Object.keys(signalPromiseArea).length; i++)
      {
        var promiseAreaList = signalPromiseArea[i].sigPromiseArea // status =1 인 sigPromiseArea 

        const result = await findDao.selectARLocation(connection, promiseAreaList);

        arLocation.push([result[0].latitude, result[0].longitude]); // status =1 인 sigPromiseArea의 위도, 경도 리스트화
      }
      

      for (var i = 0; i < Object.keys(signalPromiseArea).length; i++){
        
        arLocationResult.latitude = arLocation[i][0];
        arLocationResult.longitude = arLocation[i][1];

        distance = haversine(myLocationResult[0], arLocationResult);
        console.log(`현재위치와 ${signalPromiseArea[i].sigPromiseArea}의 좌표인 ${arLocation[i][0]} , ${arLocation[i][1]}의 거리는 : ${distance}`);
        
        if(distance == 3 || distance < 3 ) // range = 3km
        {
          
          matchingAddress.push(signalPromiseArea[i].sigPromiseArea);
          // Signaling Table에서 장소 데이터 -> sigIdx
          
        }
        else if(distance > 3)
        {
          console.log("3km 거리에서 벗어난 시그널 입니다.");
          console.log("--------------------------------")
        }
        else
        {
            console.log("error");
        }
      }
     
      const signalIdxList = findDao.getSignalByAddress(connection, [matchingAddress]); // 리스트 감싸니까 IN 먹히네.
          
      console.log("내 근처 시그널의 signal를 반환합니다.");
          
      connection.release();
      return signalIdxList;  // 현재 3km 안에 있는 시그널Idx 리스트. 없으면 []
    } 
    catch (err) {
      logger.error(`findProvider error\n: ${err.message}`);
      return errResponse(baseResponse.DB_ERROR);
    }
    //[[{signalIdx : 8}], [{signalIdx : 9}]]
}