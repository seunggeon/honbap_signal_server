/*
    ******
    ABOUT HASHTAG
    ******
*/

// 해시태그 입력 *** 1 ***
async function insertHashTag(connection, params) {
    const query =   `
                    INSERT INTO 
                    HashTag (userIdx, hashTag)
                    VALUES (?, ?);
                    `;
    const [row] = await connection.query(query, params);
    return row;
}

// 해시태그 삭제 *** 2 ***
async function deleteHashTag(connection, params) {
    const query =   `
                    DELETE FROM HashTag
                    WHERE userIdx = ? and hashTag = ?;
                    `;
    const [row] = await connection.query(query, params);
    return row;
}

// 해시태그 체크 *** 3 ***
async function checkHashTag(connection, userIdx) {
    const query =   `
                    SELECT hashTag
                    FROM HashTag
                    WHERE userIdx = ?;
                    `;
    const [row] = await connection.query(query, userIdx);
    return row;
}

// 해시태그 개수 체크 *** 4 ***
async function countHashTag(connection, userIdx) {
    const query =   `
                    SELECT COUNT(hashTag) AS countTag
                    FROM HashTag
                    WHERE userIdx = ?;
                    `;
    const [row] = await connection.query(query, userIdx);
    return row;
}
//원래 유저 닉네임인걸 테스트위해 네임으로 수정
// 해시태그 탐색 *** 5 ***
async function selectHashTag(connection, params) {
    const query =   `
                    SELECT up.userName 
                    FROM HashTag AS h 
                        LEFT JOIN User AS up ON up.userIdx = h.userIdx
                    WHERE h.hashTag = ?;
                    `;
    const [row] = await connection.query(query, params);
    return row;
}



module.exports = {
    insertHashTag,  // 1
    deleteHashTag,  // 2
    checkHashTag,   // 3
    countHashTag,   // 4
    selectHashTag,  // 5
};