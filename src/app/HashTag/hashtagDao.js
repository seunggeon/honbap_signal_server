/*
    ******
    ABOUT HASHTAG
    ******
*/

async function insertHashTag(connection, params) {
    const query =   `
                    INSERT INTO 
                    HashTag (userIdx, hashTag)
                    VALUES (?, ?);
                    `;
    const [row] = await connection.query(query, params);
    return row;
}

async function deleteHashTag(connection, params) {
    const query =   `
                    DELETE FROM HashTag
                    WHERE userIdx = ?, hashTag = ?;
                    `;
    const [row] = await connection.query(query, params);
    return row;
}