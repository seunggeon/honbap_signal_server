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
                  insert into User(userId, password, userName, birth, email, phoneNum, sex)
                  values (?, ?, ?, ?, ?, ?, ?);

                  `;

                  
    const row = await connection.query(query, params);
  
    return row;
}

// 유저 인덱스 조회 *** 6 ***
async function selectUserIdx(connection, userId) {
    const query = `
                  select userIdx
                  from User
                  where userId = ?;
                  `;
  
    const row = await connection.query(query, userId);
  
    return row;
}

  // 유저 개인 정보 수정 *** 7 ***
async function updateUserProfile(connection, params) {
    const query = `
                  update User 
                  set password = ?, email = ?, updateAt = default  
                  where userId = ?;
                  `;

    const row = await connection.query(query, params);

    return row;
}

//==================================================
// user profile

// 유저 프로필 입력 *** 8 ***
async function insertUserProfile(connection, params) {
    const query = `
                  INSERT INTO UserProfile (userIdx, nickName, profileImg, taste, hateFood, interest, avgSpeed, preferArea, mbti, userIntroduce)
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                  `;
    const row = await connection.query(query, params);

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
//async function selectUserInfo(connection, userIdx)



module.exports = {
    existUserId, // 1
    existUserEmail, // 2
    existUserPhone, // 3
    selectUserId, // 4
    insertUserInfo, // 5
    selectUserIdx, // 6
    updateUserProfile, // 7
    insertUserProfile, // 8
    existUserNickname, // 9
//    selectUserInfo, // 10
  };