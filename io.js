var io = require('socket.io')();

var players = {};

io.on('connection', function(socket) {
    // when the player disconnects, remove key & notify clients
    socket.on('disconnect', function (data) {
        delete players[socket.initials];
        io.emit('update-player-list', Object.keys(players));
    });

    socket.on('register-player', function(data) {
    // assigning true is arbitrary, we just need to create a key
		players[data.initials] = true;
		socket.initials = data.initials;
		io.emit('update-player-list', Object.keys(players));
    });

	socket.on('add-circle', function(data){
		io.emit('add-circle', data);
	});

	socket.on('clear-circle', function(){
		io.emit('clear-circle');
	});
});

module.exports = io;
