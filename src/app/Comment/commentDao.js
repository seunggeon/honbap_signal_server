// Comment

const { startTimer } = require("winston");

// 후기 등록    *** 1 ***
async function insertComment(connection, params) {
    const query =   `
                    INSERT INTO Comment
                    (signalIdx, userIdx, writerIdx, comment, star)
                    VAlUES (?, ?, ?, ?, ?);
                    `;
    const [row] = await connection.query(query, params);
    return row;
}

// 후기 등록 시 해당 userIdx를 가진 row에 mannerCount를 1 더해준다. *** 2 ***
async function plusManner(connection, userIdx) {
    const query =   `
                    UPDATE Manner 
                    SET mannerCount = mannerCount + 1 
                    WHERE userIdx = ?;
                    `;
    const [row] = await connection.query(query, userIdx);
    return row;
}

// 매너지수 계산 *** 3 ***
async function forCalculateManner(connection, params) {
    const query =   `
                    UPDATE Manner, (SELECT star FROM Comment WHERE signalIdx = ?) AS star
                    SET manner =
                                    CASE
                                    WHEN star = 1 THEN manner - 0.03
                                    WHEN star = 2 THEN manner - 0.02
                                    WHEN star = 3 THEN manner - 0.01
                                    WHEN star = 4 THEN manner + 0
                                    ELSE manner + 0.01
                                    END
                    WHERE userIdx = ? ;
                    `;
    const [row] = await connection.query(query, params);
    return row;
}

// 나에게 써진 후기 조회 *** 4 ***
async function selectCommented(connection, userIdx) {
    const query =   `
                    SELECT nickName AS reviewer, comment, star
                    FROM User AS up, Comment AS c
                    WHERE c.userIdx = ? AND up.userIdx = c.writerIdx;
                    `;
    const [row] = await connection.query(query, userIdx);
    return row;
}

// 내가 쓴 후기 조회 *** 5 ***
async function selectCommenting(connection, writerIdx) {
    const query =   `
                    SELECT nickName AS reviewer, comment, star
                    FROM User AS up, Comment AS c
                    WHERE c.writerIdx = ? AND up.userIdx = c.userIdx;
                    `;
    const [row] = await connection.query(query, writerIdx);
    return row;
}

module.exports = {
    insertComment,      // 1
    plusManner,         // 2
    forCalculateManner, // 3
    selectCommented,    // 4
    selectCommenting,   // 5
};