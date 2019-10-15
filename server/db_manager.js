const chat = require('./models/chat').chat;
const post = require('./models/post').post;
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://user:temp-pass@cluster0-pyeaw.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
const dbName = "exchange";
let chatCollection;
let postCollection;

client.connect(err => {
    if (err) { // TODO: reconnect
        console.error(err);
        return;
    }

    chatCollection = client.db(dbName).collection("chat");
    postCollection = client.db(dbName).collection("post");
    // chatCollection.insertMany(tempChatDb, err => console.error(err)); // TODO: Remove temp db
    // postCollection.insertMany(tempPostsDb, err => console.error(err)); // TODO: Remove temp db
});

exports.getChats = function() {
    return fetchCollection(chatCollection, chat.prototype);
}

exports.getPosts = function() {
    return fetchCollection(postCollection, post.prototype);
}

function fetchCollection(collection, prot) {
    return new Promise((res, rej) => {
        // TODO: handle the case of a disconnected client
        collection.find().toArray(function(err, results) {
            if (err) {
                console.error(err);
                rej(err);
                return;
            }
            if (prot) { // Attach a prototype to each item
                for(let obj of results) {
                    obj = Object.create(obj, prot);
                }
            }
            res(results);
        })
    });
}




// TODO: remove this!
var tempPostsDb = [
    {
        game: 'GTA5',
        userId: '1',
        price: 10,
        location: 'North',
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa'
    },
    {
        game: 'spider-man',
        userId: '2',
        price: 20,
        location: 'West',
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa'
    },
    {
        game: 'uncharted',
        userId: '3',
        price: 30,
        location: 'South',
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa'
    },
    {
        game: 'uncharted',
        userId: '3',
        price: 30,
        location: 'South',
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa'
    },
    {
        game: 'uncharted',
        userId: '3',
        price: 30,
        location: 'South',
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa'
    },
    {
        game: 'uncharted',
        userId: '3',
        price: 30,
        location: 'South',
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa'
    },
];

var tempChatDb = [
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
    },
    {
        userId: '3',
        userName: 'Test3',
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