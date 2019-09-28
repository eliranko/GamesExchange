let tempDb = [
    {
        game: 'GTA5',
        userId: '1',
        userName: 'yoyo',
        price: 10,
        location: 'North',
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa'
    },
    {
        game: 'spider-man',
        userId: '2',
        userName: 'popo',
        price: 20,
        location: 'West',
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa'
    },
    {
        game: 'uncharted',
        userId: '3',
        userName: 'koko',
        price: 30,
        location: 'South',
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa'
    },
];

exports.getPosts = function() {
    return tempDb;
}