/*
    ***
    ABOUT BlackList Table
    ***
    */

// 블랙리스트 추가 *** 1 ***
async function insertBlack(connection, params) {
    const query =   `
                    INSERT INTO BlackList (userIdx, blackIdx, whyBlack)
                    VALUES (?, ?, ?);
                    `;
    const [row] = await connection.query(query, params);
    return row;
}

// 블랙리스트 제거 *** 2 ***
async function deleteBlack(connection, params) {
    const query =   `
                    DELETE FROM BlackList 
                    WHERE userIdx = ? AND blackIdx = ?;
                    `;
    const [row] = await connection.query(query, params);
    return row;
}

// 블랙리스트 조회 *** 3 ***
async function selectBlack(connection, userIdx) {
    const query =   `
                    SELECT up2.nickName AS blackNickName
                    FROM BlackList AS b
                        RIGHT JOIN UserProfile AS up2 ON up2.userIdx = b.blackIdx
                    WHERE b.userIdx = ?; 
                    `;
    const [row] = await connection.query(query, userIdx);
    return row;
}

// 블랙리스트 상세 조회 *** 4 ***
async function selectBlackInfo(connection, params) {
    const query =   `
                    SELECT up2.nickName AS blackNickName, b.whyBlack
                    FROM BlackList AS b
                        RIGHT JOIN UserProfile AS up2 ON up2.userIdx = b.blackIdx
                    WHERE b.userIdx = ? AND b.blackIdx = ?;
                    `;
    const [row] = await connection.query(query, params);
    return row;
}

// 블랙리스트 체크 *** 5 ***
async function checkBlackIdx(connection, params) {
    const query =   `
                    SELECT blackIdx
                    FROM BlackList
                    WHERE userIdx = ? AND blackIdx = ?;
                    `;
    const [row] = await connection.query(query, params);
    return row[0];
}

module.exports = {
    insertBlack,        // 1
    deleteBlack,        // 2
    selectBlack,        // 3
    selectBlackInfo,    // 4
    checkBlackIdx,      // 5
};