/*
    ***
    ABOUT BlackList Table
    ***
    */

// 블랙리스트 추가
async function insertBlack(connection, params) {
    const query =   `
                    INSERT INTO BlackList (userIdx, blackIdx, whyBlack)
                    VALUES (?, ?, ?);
                    `;
    const [row] = await connection.query(query, params);
    return row;
}

// 블랙리스트 제거
async function deleteBlack(connection, params) {
    const query =   `
                    DELETE FROM BlackList 
                    WHERE userIdx = ? AND blackIdx = ?;
                    `;
    const [row] = await connection.query(query, params);
    return row;
}

// 블랙리스트 조회
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

// 블랙리스트 상세 조회
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

// 블랙리스트 체크
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
    insertBlack,
    deleteBlack,
    selectBlack,
    selectBlackInfo,
    checkBlackIdx,
};