async function insertUserLocation(connection, params) {
    const query = `
                  INSERT INTO UserLocation(latitude, longitude)
                  VALUES(?,?);
                  `;
    const row = await connection.query(query, params);

    return row;
}

async function updateLocation(connection, params) {
    const query = `
                  UPDATE UserLocation
                  SET latitude = ?, longitude = ?
                  WHERE userIdx = ?;
                  `;
    const [row] = await connection.query(query, params);

    return row;
}

// userLocation Table에서 내 최신 위치 정보 불러오기 
async function selectUserLocation(connection, userIdx) {
    const query = `
                    SELECT latitude, longitude
                    FROM UserLocation
                    WHERE userIdx = ?;
                  `;
    const [row] = await connection.query(query, userIdx);

    return row;
}


// Siganling Table에서 활성화된 시그널의 SignalArea 정보 가져오기
async function selectSignalLocation(connection) {
    const query = `
                SELECT sigPromiseArea
                FROM Signaling
                WHERE sigStatus = '1' ; # " "이 아니라 ' '하니까 되네;;
                  `;
    const [row] = await connection.query(query);

    return row;
}

// AR zone Table에서 장소 -> 위도, 경도 받아오기
async function selectARLocation(connection, signalPromiseArea) {
    const query = `
                    SELECT latitude, longitude
                    FROM ARzone
                    WHERE address = ? ;
                  `;
    const [row] = await connection.query(query, signalPromiseArea);

    return row;
}

//AR zone Table에서 위도, 경도 -> 장소
// async function getAddressByLocation(connection, params){
//     const query = `
//                     SELECT latitude, longitude
//                     FROM ARzone
//                     WHERE latitude = ? AND longitude = ?;
//                   `;
//     const [row] = await connection.query(query, params);

//     return row;
// }

// Signaling Table에서 장소 -> userIdx 와 sigIdx
async function getSignalByAddress(connection, matchingAddress){
    const query = `
                    SELECT signalIdx
                    FROM Signaling
                    WHERE sigPromiseArea IN (?) ;
                 `;
    const [row] = await connection.query(query, matchingAddress);
    console.log(row[0]);
    return row ;
    
    /*
    row
    ----------------------------------------
    [{signalidx : 8 }, {signalIdx : none} ]
    ------------------------------------
    */

    return id;
}


module.exports = {
    insertUserLocation, // 1
    updateLocation, // 2
    selectUserLocation, // 3
    selectSignalLocation, // 4
    selectARLocation, // 5
    // getAddressByLocation, // 6
    getSignalByAddress // 7
};