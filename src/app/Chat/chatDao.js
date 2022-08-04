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
    getRooms,
}