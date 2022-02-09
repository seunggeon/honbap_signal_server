// Comment

const { startTimer } = require("winston");

// 후기 등록
async function insertComment(connection, params) {
    const query =   `
                    INSERT INTO Comment
                    (signalIdx, userIdx, writerIdx, comment, star)
                    VAlUES (?, ?, ?, ?, ?);
                    `;
    const [row] = await connection.query(query, params);
    return row;
}

// 나에게 써진 후기 조회
async function selectCommented(connection, userIdx) {
    const query =   `
                    SELECT nickName AS reviewer, comment, star
                    FROM UserProfile AS up, Comment AS c
                    WHERE c.userIdx = ? AND up.userIdx = c.writerIdx;
                    `;
    const [row] = await connection.query(query, userIdx);
    return row;
}

// 내가 쓴 후기 조회
async function selectCommenting(connection, writerIdx) {
    const query =   `
                    SELECT nickName AS reviewer, comment, star
                    FROM UserProfile AS up, Comment AS c
                    WHERE c.writerIdx = ? AND up.userIdx = c.userIdx;
                    `;
    const [row] = await connection.query(query, writerIdx);
    return row;
}

module.exports = {
    insertComment,
    selectCommented,
    selectCommenting,
};