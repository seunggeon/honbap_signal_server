// 채팅방 생성
async function createChatRoom(connection, params) {
    const query = `
                    INSERT INTO Chat
                    (userIdx, mathchIdx, roomName)
                    VALUES (?, ?, ?);
                    `;
    const [row] = await connection.query(query, params);
  
    return row;
}

module.exports = {
    createChatRoom,
};