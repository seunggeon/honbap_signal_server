
// 휴대폰 번호 체크
async function selectUserPhoneNum(connection, hashedPhoneNum) {
    const query = `
        select exists(select phoneNum from User where phoneNum = ?) as exist;
        `;

    const row = await connection.query(query, hashedPhoneNum);

    return row[0];
}

// 닉네임 체크
async function selectUserNickname(connection, nickName) {
    const query = `
      select exists(select nickName from User where nickName = ?) as exist;
      `;
  
    const row = await connection.query(query, nickName);
  
    return row[0];
}

// 회원가입
async function insertUserInfo(connection, params) {
    const query = `
                  insert into User(phoneNum, nickName)
                  values (?, ?);
                  `;
/*    const query = `
                  insert into User(userId, password, userName, nickName, email, phoneNum, sex, createAt, updateAt)
                  values (?, ?, ?, ?, ?, ?, DEFAULT, DEFAULT);
                  `;
                  */
    const row = await connection.query(query, params);
  
    return row;
}

// 유저 ID 조회
async function selectUserId(connection, hashedPhoneNum) {
    const query = `
                  select userId
                  from User
                  where phoneNum = ?;
                  `;
  
    const row = await connection.query(query, hashedPhoneNum);
  
    return row[0];
}

  // 유저 정보 수정
async function updateUserProfile(connection, params) {
    const query = `
                  update User 
                  set password = ?, nickname = ?, email = ?, updateAt = default  
                  where userId = ?;
                  `;

    const row = await connection.query(query, params);

    return row;
}

module.exports = {
    selectUserPhoneNum,
    selectUserNickname,
    insertUserInfo,
    selectUserId,
    updateUserProfile,
  };