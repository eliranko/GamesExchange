const chat = function (usersId) {
    return { usersId: usersId ? usersId : [], unreadMessages: 0, chatHistory: [] };
}
exports.chat = chat;