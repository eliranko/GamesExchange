const chat = function (userId, userName, online) {
    return { userId, userName, online, unreadMessages: 0, chatHistory: [] };
}
chat.prototype.sendMessage = function(sender, message) {
    this.chatHistory.add({sender, message});
}
exports.chat = chat;