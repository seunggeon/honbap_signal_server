/*
*** ***
signal table -  userIdx : User.userIdx
                matchIdx : user.userIdx
                signalIdx : for 시그널 체크
                sigStatus : 시그널 on/off 확인
                sigHideStatus : 시그널 숨김/열림 확인
                sigStart : 시그널 시작 시간
                sigPromiseTime : 약속 시간
                sigPromiseArea : 약속 장소
                createAt
                updateAt
*** ***
*/

// 시그널 등록 *** 1 ***
async function insertSignal(connection, params) {
    const query = `
                  INSERT INTO Signaling
                  (userIdx, matchIdx, sigPromiseTime, sigPromiseArea)
                  VALUES (?, ?, ?, ?);
                  `
    const [row] = await connection.query(query, params);

    return row;
}

// 켜져 있는 시그널 조회 *** 2 ***
async function selectSignalList(connection, userIdx) {
    const query = `
                  SELECT up1.nickName as userNickName, up2.nickName as matchingNickName, 
                         s.sigPromiseTime, s.sigPromiseArea, s.sigStart, s.updateAt 
                  FROM
                        (select nickName from UserProfile AS upa, Signaling AS s where upa.userIdx = s.userIdx) AS up1,
                        (select nickName from UserProfile AS upb, Signaling AS s where upb.userIdx = s.matchIdx) AS up2,
                         Signaling AS s
                  WHERE s.userIdx = ? AND sigStatus = 1
                  ORDER BY s.signalIdx DESC;
                  `

    const [row] = await connection.query(query, userIdx);
    return row;
}

// 시그널 수정 *** 3 ***
async function updateSignal(connection, params) {
    const query = ''
    const [row] = await connection.query(query, params);

    return row;
}

module.exports = {
    insertSignal, // 1
    selectSignalList, // 2
    updateSignal, // 3
};