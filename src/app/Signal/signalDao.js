/*
*** ***
signal table -  userIdx : User.userIdx
                matchIdx : user.userIdx
                signalIdx : for 시그널 체크
                sigStatus : 시그널 on/off 확인
                sigMatchStatus : 시그널 숨김/열림 확인
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
                  (userIdx, sigPromiseTime, sigPromiseArea)
                  VALUES (?, ?, ?);
                  `;
  const [row] = await connection.query(query, params);

  return row;
}

// 켜져 있는 시그널 조회 *** 2 ***
async function selectSignalList(connection, userIdx) {
  const query = `
                    SELECT up1.nickName as userNickName, up2.nickName as matchingNickName,
                    s.sigPromiseTime, s.sigPromiseArea, s.sigStart, s.updateAt
                    FROM  Signaling AS s
                        LEFT JOIN UserProfile AS up1 ON s.userIdx = up1.userIdx
                        LEFT JOIN UserProfile AS up2 ON s.matchIdx = up2.userIdx
                    WHERE s.userIdx = ? AND s.sigStatus = 1
                    ORDER BY s.signalIdx DESC;
                    `;

  const [row] = await connection.query(query, userIdx);
  return row;
}

// 시그널 수정 *** 3 ***
async function updateSignal(connection, params) {
  const query = `
                  UPDATE Signaling
                  SET sigPromiseTime = ?, sigPromiseArea = ?, sigStart = ?, updateAt = default
                  where userIdx = ? AND sigStatus = 1;
                  `;
  const [row] = await connection.query(query, params);

  return row;
}

// 시그널 매칭 상대 업데이트 *** 4 ***
async function updateSigMatch(connection, params) {
  const query = `
                  UPDATE Signaling
                  SET matchIdx = ?, sigStatus = 0, sigMatchStatus = 1
                  where userIdx = ? AND sigStatus = 1;
                  `;
  const [row] = await connection.query(query, params);

  return row;
}

// 시그널 OFF *** 5 ***
async function signalOff(connection, userIdx) {
  const query = `
                  UPDATE Signaling
                  SET sigStatus = 0
                  WHERE sigStatus = 1 AND userIdx = ?;
                  `;

  const [row] = await connection.query(query, userIdx);
  return row;
}

// 시그널 리스트에서 삭제 *** 6 ***
async function deleteSignal(connection, params) {
  const query = `
                  DELETE FROM Signaling
                  WHERE signalIdx = ? AND userIdx = ?;
                  `;
  const [row] = await connection.query(query, params);
  return row;
}

// 시그널 ON *** 7 ***
async function signalOn(connection, userIdx) {
  const query = `
                  UPDATE Signaling
                  SET sigStatus = 0
                  WHERE sigStatus = 0 AND userIdx = ?;
                  `;

  const [row] = await connection.query(query, userIdx);
  return row;
}

// 시그널 리스트 신청 *** 8 ***
async function postSignalApply(connection, params) {
  const query = `
                    INSERT INTO SignalApply
                    (signalIdx, userIdx, applyIdx) 
                    VALUES (?, ?, ?);
                    `;
  const [row] = await connection.query(query, params);
  return row;
}

// 시그널 신청 리스트 조회 *** 9 ***
async function getSignalApply(connection, userIdx) {
  const query = `
                    SELECT DISTINCT nickName
                    FROM Signaling AS s, SignalApply AS sa, UserProfile AS up
                    WHERE s.sigStatus = 1 AND sa.userIdx = 2 AND 
                            sa.applyIdx = up.userIdx ORDER BY sa.trashIdx ASC;
                    `;
  const [row] = await connection.query(query, userIdx);
  return row;
}

// 시그널 신청 리스트 삭제 (자동) *** 10 ***
async function deleteSignalApply(connection, userIdx) {
  const query = `
                    DELETE FROM SignalApply
                    WHERE userIdx = ?;
                    `;
  const [row] = await connection.query(query, userIdx);
  return row;
}

// 시그널 신청 취소 *** 11 ***
async function cancelSignalApply(connection, params) {
  const query = `
                    DELETE FROM SignalApply
                    WHERE userIdx = ? AND applyIdx = ?;
                    `;
  const [row] = await connection.query(query, params);
  return row;
}

// 이전 시그널들 조회 *** 12 ***
async function endSignals(connection, params) {
  const query = `
                    SELECT up1.nickName, up2.nickName, s.sigPromiseArea, s.sigPromiseTime
                    FROM    Signaling AS s
                            right join UserProfile AS up1 ON s.userIdx = up1.userIdx
                            right join UserProfile AS up2 ON s.matchIdx = up2.userIdx
                    WHERE (s.userIdx = ? OR s.matchIdx = ?) AND s.sigStatus = 0;
                    `;
  const [row] = await connection.query(query, params);
  return row;
}

// ARzone locations에 sigPromiseArea가 있는지 조회 ***13***
async function arzoneList(connection, arzoneList) {
  const query = `
                SELECT address
                FROM ARzone
                WHERE address = ?;
                `;
  const [row] = await connection.query(query, arzoneList);
  return row;
}

module.exports = {
  insertSignal, // 1
  selectSignalList, // 2
  updateSignal, // 3
  updateSigMatch, // 4
  signalOff, // 5
  deleteSignal, // 6
  signalOn, // 7
  postSignalApply, // 8
  getSignalApply, // 9
  deleteSignalApply, // 10
  cancelSignalApply, // 11
  endSignals, // 12
  arzoneList, // 13
};
