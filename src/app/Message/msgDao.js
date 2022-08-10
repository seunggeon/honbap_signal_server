
// 쪽지함 생성 *** 1 ***
async function createMsgRoom(connection, params) {
    const query = `
                  INSERT INTO MessageRoom(userIdx, matchIdx, roomId)
                  VALUES(?,?,?);
                  `;
  
    const [row] = await connection.query(query, params);
    
    return row;
}


// 쪽지 보내기 *** 2 ***
async function sendMsg(connection, params) {
    const query = `
                  INSERT INTO Message(roomId, senderIdx, text)
                  VALUES(?,?,?);
                  `;
  
    const [row] = await connection.query(query, params);
    
    return row;
}

// 쪽지 확인 *** 3 ***
async function getMsg(connection, params) {
    const query = `
                  SELECT 
                        (SELECT text FROM Message
                         WHERE roomId = ? AND senderIdx = ?) AS sendText,
                        (SELECT text FROM Message
                         WHERE roomId = ? AND senderIdx = ?) AS receiveText,
                         sendAt
                  FROM Message
                  WHERE roomId = ?
                  ORDER BY sendAt DESC;
                  `;
  
    const [row] = await connection.query(query, params);
    
    return row;
}


module.exports = {
    createMsgRoom,      // 1
    sendMsg,            // 2
    getMsg             // 3
};