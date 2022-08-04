
// 채팅방 생성
async function createChatRoom(connection, params) {
    const query = `
                    INSERT INTO Chat
                    (userIdx, matchIdx, roomName)
                    VALUES (?, ?, ?);
                    `;
    const [row] = await connection.query(query, params);
}

// 채팅방 조회
async function getRooms(connection, params) {
    const query = `
            SELECT roomName
            FROM Chat
            WHERE userIdx = ? OR matchIdx = ?;
    `;

    const [row] = await connection.query(query, params);

    return row;
}

module.exports = {
    createChatRoom,
    getRooms,
}
