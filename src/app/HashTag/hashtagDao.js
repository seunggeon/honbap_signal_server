/*
    ******
    ABOUT HASHTAG
    ******
*/

// insert
async function insertHashTag(connection, params) {
    const query =   `
                    INSERT INTO 
                    HashTag (userIdx, hashTag)
                    VALUES (?, ?);
                    `;
    const [row] = await connection.query(query, params);
    return row;
}

// delete
async function deleteHashTag(connection, params) {
    const query =   `
                    DELETE FROM HashTag
                    WHERE userIdx = ?, hashTag = ?;
                    `;
    const [row] = await connection.query(query, params);
    return row;
}

// check
async function checkHashTag(connection, userIdx) {
    const query =   `
                    SELECT hashTag
                    FROM HashTag
                    WHERE userIdx = ?;
                    `;
    const [row] = await connection.query(query, userIdx);
    return row;
}

// count
async function countHashTag(connection, userIdx) {
    const query =   `
                    SELECT COUNT(hashTag) AS countTag
                    FROM HashTag
                    WHERE userIdx = ?;
                    `;
    const [row] = await connection.query(query, userIdx);
    return row;
}

// search
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
    insertHashTag,
    deleteHashTag,
    checkHashTag,
    countHashTag,
    selectHashTag,
};