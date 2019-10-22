const chat = require('./models/chat').chat;
const post = require('./models/post').post;
const user = require('./models/user').user;
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://user:temp-pass@cluster0-pyeaw.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
const dbName = "exchange";
let userCollection;
let chatCollection;
let postCollection;

client.connect(err => {
    if (err) { // TODO: reconnect
        console.error(err);
        return;
    }

    userCollection = client.db(dbName).collection("user");
    chatCollection = client.db(dbName).collection("chat");
    postCollection = client.db(dbName).collection("post");
    // userCollection.insertMany(tempUsersDb, err => console.error(err)); // TODO: Remove temp db
    // chatCollection.insertMany(tempChatDb, err => console.error(err)); // TODO: Remove temp db
    // postCollection.insertMany(tempPostsDb, err => console.error(err)); // TODO: Remove temp db
});

exports.getChats = function (userId) {
    return fetch(chatCollection, { "usersId": { $in: [userId] } }, chat.prototype);
}

exports.getPosts = function () {
    return fetch(postCollection, post.prototype);
}

exports.getUser = function (id) {
    return fetchOne(userCollection, { "id": id }, user.prototype);
}

function fetchOne(collection, query, prot) {
    return fetch(collection, query, prot).then(data => {
        if (data.length == 0) {
            return data;
        }

        return data[0];
    });
}

function fetch(collection, query, prot) {
    return new Promise((res, rej) => {
        // TODO: handle the case of a disconnected client
        collection.find(query ? query : {}).toArray(function (err, results) {
            if (err) {
                console.error(err);
                rej(err);
                return;
            }
            for (let obj of results) {
                if (prot) { // Attach a prototype
                    obj = Object.assign(Object.create(prot), obj);
                }
                delete obj._id;
            }
            res(results);
        })
    });
}

// TODO: remove this!
var tempUsersDb = [
    {
        id: '1',
        name: "Noam",
        online: true
    },
    {
        id: '2',
        name: "Osher",
        online: false
    },
    {
        id: '3',
        name: "Shay",
        online: true
    }
]

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
];

var tempChatDb = [
    {
        usersId: ['1', '2'],
        unreadMessages: 5,
        chatHistory: [
            { userId: '1', message: 'yo man' },
            { userId: '2', message: 'yo dude' },
            { userId: '2', message: 'Sup?' },
            { userId: '1', message: 'Not your dude, bro' },
            { userId: '2', message: 'Weird flex, but ok...' },
            { userId: '2', message: 'Weird flex, but ok...' },
            { userId: '1', message: 'Weird flex, but ok...' },
            { userId: '2', message: 'Weird flex, but ok...' },
        ]
    },
    {
        usersId: ['1', '3'],
        unreadMessages: 0,
        chatHistory: [
            { userId: '1', message: 'yo man' },
            { userId: '3', message: 'yo dude' },
            { userId: '3', message: 'Sup?' },
            { userId: '1', message: 'Not your dude, bro' },
            { userId: '3', message: 'Weird flex, but ok...' },
        ]
    }
]