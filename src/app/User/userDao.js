// 데이터 가져오기 원본

// 비밀번호 체크
async function selectUserPassword(connection, hashedPassword) {
    const query = `
        select exists(select password from User where password = ?) as exist;
        `;

    const row = await connection.query(query, hashedPassword);

    return row[0];
}

// 위는 수정이 필요한 부분입니다 :



// user ID 체크 : 데옹
async function existUserId(connection, userId) {
    const query = `
      select exists(select userId from User where userId = ?) as exist;
      `;
  
    const row = await connection.query(query, userId);
  
    return row[0];
}
// 닉네임 체크 : 데옹
async function existUserNickname(connection, nickName) {
    const query = `
      select exists(select nickName from User where nickName = ?) as exist;
      `;
  
    const row = await connection.query(query, nickName);
  
    return row[0];
}
// 이메일 체크 : 데옹
async function existUserEmail(connection, email) {
    const query = `
      select exists(select email from User where email = ?) as exist;
      `;
  
    const row = await connection.query(query, email);
  
    return row[0];
}
// 핸드폰 번호 체크 : 데옹
async function existUserPhone(connection, phoneNum) {
    const query = `
      select exists(select phoneNum from User where phoneNum = ?) as exist;
      `;
  
    const row = await connection.query(query, phoneNum);
  
    return row[0];
}



// userId 회원 조회
async function selectUserId(connection, userId) {
    const selectUserIdQuery = `
                   SELECT userId, userName
                   FROM User
                   WHERE userId = ?;
                   `;
    const [userRow] = await connection.query(selectUserIdQuery, userId);
    return userRow;
  }


// 회원가입
async function insertUserInfo(connection, params) {
/*    const query = `
                  insert into User(phoneNum, nickName)
                  values (?, ?);
                  `;*/
    const query = `
                  insert into User(userId, password, userName, nickName, email, phoneNum, sex, createAt, updateAt)
                  values (?, ?, ?, ?, ?, ?, DEFAULT, DEFAULT);
                  `;
                  
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
    selectUserPassword,
    existUserId,
    existUserNickname,
    existUserEmail,
    existUserPhone,
    insertUserInfo,
    selectUserId,
    updateUserProfile,
  };