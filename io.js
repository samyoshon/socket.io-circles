var io = require('socket.io')();

io.on('connection', function(socket) {
	
	socket.on('add-circle', function(data){
		io.emit('add-circle', data);
	});

	socket.on('clear-circle', function(){
		io.emit('clear-circle');
	});
});

module.exports = io;
