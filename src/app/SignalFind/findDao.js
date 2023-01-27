async function insertUserLocation(connection, params) {
    const query = `
                  INSERT INTO UserLocation(latitude, longitude)
                  VALUES(?,?);
                  `;
    const row = await connection.execute(query, params);

    return row;
}

async function updateLocation(connection, params) {
    const query = `
                    UPDATE location
                    SET latitude = :latit, longitude = :longit
                    WHERE useridx = :idx
                  `;

    // console.log(params);
    const row = await connection.execute(query, params);

    // const row = await connection.execute(`
    //             SELECT * 
    //             FROM location
    //         `);
    // TEST 성공

    return row;
};

// userLocation Table에서 내 최신 위치 정보 불러오기 " "이 아니라 ' '하니까 되네;;
async function selectUserLocation(connection, userIdx) {
    const query = `
                    SELECT latitude, longitude
                    FROM UserLocation
                    WHERE userIdx = :userIdx;
                  `;
    const [row] = await connection.execute(query, userIdx);

    return row;
}


// Siganling Table에서 활성화된 시그널의 SignalArea 정보 가져오기
async function selectSignalLocation(connection,params) {
    const query = `
                    SELECT latitude, longitude
                    FROM UserLocation
                    WHERE userIdx = ?;
                  `;
    const [row] = await connection.execute(query,params);

    return row;
}

async function getSignalStatus(connection, params){
    const query = `
                    SELECT up.*, u.nickName, s.signalIdx, s.sigPromiseArea, s.sigPromiseTime, s.checkSigWrite
                    FROM Signaling AS s
                            LEFT JOIN User AS u ON s.userIdx = u.userIdx
                            LEFT JOIN UserProfile AS up ON s.userIdx = up.userIdx
                    WHERE s.sigStatus = 1;
                 `;
    const [row] = await connection.execute(query, params);

    return row ;
}


module.exports = {
    insertUserLocation, // 1
    updateLocation, // 2
    selectUserLocation, // 3
    selectSignalLocation, // 4
    getSignalStatus // 8
};