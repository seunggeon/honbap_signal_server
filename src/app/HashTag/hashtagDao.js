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
                    WHERE userIdx = ?, hashTag = ?;
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

// 해시태그 탐색 *** 5 ***
async function selectHashTag(connection, params) {
    const query =   `
                    SELECT up.nickName 
                    FROM HashTag AS h, UserProfile AS up
                    WHERE h.hashTag = ? AND h.userIdx = up.userIdx;
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