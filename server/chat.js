let tempDb = [
    {
        userId: '1',
        userName: 'Test1',
        online: true, // Should be in a user collection DB
        unreadMessages: 5,
        chatHistory: [
            {sender: 0, message: 'yo man'},
            {sender: 1, message: 'yo dude'},
            {sender: 1, message: 'Sup?'},
            {sender: 0, message: 'Not your dude, bro'},
            {sender: 1, message: 'Weird flex, but ok...'},
            {sender: 1, message: 'Weird flex, but ok...'},
            {sender: 0, message: 'Weird flex, but ok...'},
            {sender: 1, message: 'Weird flex, but ok...'},
        ]
    },
    {
        userId: '2',
        userName: 'Test2',
        online: false, // Should be in a user collection DB
        unreadMessages: 0,
        chatHistory: [
            {sender: 0, message: 'yo man'},
            {sender: 1, message: 'yo dude'},
            {sender: 1, message: 'Sup?'},
            {sender: 0, message: 'Not your dude, bro'},
            {sender: 1, message: 'Weird flex, but ok...'},
        ]
    }
]

exports.getChat = function() {
    return tempDb;
}