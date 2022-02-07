// Comment

// 후기 등록
async function insertComment(connection, params) {
    const query =   `
                    INSERT INTO Comment
                    (signalIdx, userIdx, writerIdx, comment, star)
                    VAlUES (?, ?, ?, ?, ?);
                    `;
    const [row] = connection.query(query, params);
    return row;
}

// 나에게 써진 후기 조회
async function selectCommented(connection, userIdx) {
    const query =   `
                    SELECT up.nickName AS reviewer, c.comment, c.star
                    FROM
                        (SELECT nickName FROM UserProfile AS up, Comment AS c
                            WHERE up.userIdx = c.writerIdx) AS up,
                        Comment AS c
                    WHERE c.userIdx = ?
                    ORDER BY c.signalIdx DESC;
                    `;
    const [row] = connection.query(query, userIdx);
    return row;
}

// 내가 쓴 후기 조회
async function selectCommenting(connection, writerIdx) {
    const query =   `
                    SELECT up.nickName, c.comment, c.star
                    FROM 
                        (SELECT nickName FROM UserProfile AS up, Comment AS c
                            WHERE up.userIdx = c.writerIdx) as up,
                        Comment AS c
                    WHERE c.writerIdx = ?
                    ORDER BY c.signalIdx DESC;
                    `;
    const [row] = connection.query(query, writerIdx);
    return row;
}

module.exports = {
    insertComment,
    selectCommented,
    selectCommenting,
};