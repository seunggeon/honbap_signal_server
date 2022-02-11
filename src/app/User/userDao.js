// 데이터 가져오기 원본

//=========================================================
// 회원가입 API
// user ID 체크 *** 1 ***
async function existUserId(connection, userId) {
    const query = `
                  SELECT userId
                  FROM User
                  WHERE userId = ?;
                  `;
  
    const [row] = await connection.query(query, userId);
    
    return row;
}
// 이메일 체크 *** 2 ***
async function existUserEmail(connection, email) {
    const query = `
                  SELECT email
                  FROM User
                  WHERE email = ?;
                  `;
  
    const [row] = await connection.query(query, email);
  
    return row;
}

// 핸드폰 번호 체크 *** 3 ***
async function existUserPhone(connection, phoneNum) {
    const query = `
                  SELECT phoneNum
                  FROM User
                  WHERE phoneNum = ?;
                  `;
  
    const [row] = await connection.query(query, phoneNum);
  
    return row;
}

// userId 회원 조회 *** 4 ***
async function selectUserId(connection, userId) {
    const selectUserIdQuery = `
                   SELECT userId, userName
                   FROM User
                   WHERE userId = ?;
                   `;
    const [userRow] = await connection.query(selectUserIdQuery, userId);
    return userRow;
  }

// 회원가입 *** 5 ***
async function insertUserInfo(connection, params) {
    const query = `
                  INSERT INTO 
                  User(userId, password, userName, birth, email, phoneNum, sex)
                  VALUES (?, ?, ?, ?, ?, ?, ?);
                  `;
    const row = await connection.query(query, params);
  
    return row;
}

// 유저 인덱스 조회 *** 6 ***
async function selectUserIdx(connection, userId) {
    const query = `
                  SELECT userIdx
                  FROM User
                  WHERE userId = ?;
                  `;
  
    const row = await connection.query(query, userId);
  
    return row;
}

  // 유저 개인 정보 수정 *** 7 ***
async function updateUserInfo(connection, params) {
    const query = `
                  UPDATE User 
                  SET userName = ?, birth = ?, updateAt = default  
                  WHERE userIdx = ?;
                  `;

    const row = await connection.query(query, params);

    return row;
}

//==================================================
// user profile

// 유저 프로필 입력 *** 8 ***
async function insertUserProfile(connection, params) {
    const query = `
                  INSERT INTO UserProfile 
                  (userIdx, nickName, profileImg, taste, hateFood, interest, avgSpeed, preferArea, mbti, userIntroduce)
                  VALUES
                  (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
                  `;
    const [row] = await connection.query(query, params);

    return row;
}
async function createUserLocation(connection, userIdx) {
    const query = `
                  INSERT INTO UserLocation
                  (userIdx) VALUES (?);
                  `;
    const [row] = await connection.query(query, userIdx);
    return row;
}
async function createUserManner(connection, userIdx) {
    const query =   `
                    INSERT INTO Manner
                    (userIdx) VALUES (?);
                    `;
    const [row] = await connection.query(query, userIdx);
    return row;
}

// 닉네임 체크 *** 9 ***
async function existUserNickname(connection, nickName) {
    const query = `
                  SELECT nickName
                  FROM UserProfile
                  WHERE nickName = ?;
                  `;

    const [row] = await connection.query(query, nickName);

    return row;
}

// 유저 개인정보 조회 *** 10 ***
async function selectUserInfo(connection, userIdx) {
    const query = `
                  SELECT userId, userName, birth, email,
                         phoneNum, sex, updateAt, createAt
                  FROM User
                  WHERE userIdx = ?;
                  `;
    const [row] = await connection.query(query, userIdx);
    return row;
}

// 유저 마이페이지 조회 *** 11 ***
async function selectUserProfile(connection, userIdx) {
    const query = `
                  SELECT nickName, profileImg, taste, hateFood, interest,
                         avgSpeed, preferArea, mbti, userIntroduce, updateAt
                  FROM UserProfile
                  WHERE userIdx = ?;
                  `;
    const [row] = await connection.query(query, userIdx);
    return row;
}

// 유저 패스워드 수정 *** 12 ***
async function updatePassword(connection, password, userIdx) {
    const query = `
                  UPDATE User
                  SET password = ?
                  WHERE userIdx = ?;
                  `;
    const [row] = await connection.query(query, password, userIdx);

    return row;
}

// 유저 프로필(마이페이지) 수정 *** 13 ***
async function updateUserProfile(connection, params) {
    const query = `
                  UPDATE UserProfile
                  SET profileImg = ?, taste = ?, hateFood = ?, 
                      interest = ?, avgSpeed = ?, preferArea = ?,
                      mbti = ?, userIntroduce = ?, updateAt = default
                  WHERE userIdx = ?;
                  `
    const [row] = await connection.query(query, params);
    return row;
}



module.exports = {
    existUserId, // 1
    existUserEmail, // 2
    existUserPhone, // 3
    selectUserId, // 4
    insertUserInfo, // 5
    selectUserIdx, // 6
    updateUserInfo, // 7
    insertUserProfile, // 8
    createUserLocation, // 8_2 - UserLocation
    createUserManner, // 8_3 - Manner
    existUserNickname, // 9
    selectUserInfo, // 10
    selectUserProfile, // 11
    updatePassword, // 12
    updateUserProfile, // 13
  };