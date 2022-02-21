/*
    ***
    ABOUT BlackList Table
    ***
    */

async function insertBlack(connection, params) {
    const query =   `
                    INSERT INTO BlackList (userIdx, blackIdx, whyBlack)
                    VALUES (?, ?, ?);
                    `;
    const [row] = await connection.query(query, params);
    return row;
}

async function deleteBlack(connection, params) {
    const query =   `
                    DELETE FROM BlackList 
                    WHERE userIdx = ? AND blackIdx = ?;
                    `;
    const [row] = await connection.query(query, params);
    return row;
}

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

module.exports = {
    insertBlack,
    deleteBlack,
    selectBlack,
    selectBlackInfo
};