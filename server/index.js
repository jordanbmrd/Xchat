const express = require('express');
const socket = require('socket.io');
const app = express();
const cors = require('cors');

// To prevent errors
app.use(cors());
app.use(express.json());

const server = app.listen('3001', () => {
	console.log('Server running on PORT 3001');
});

io = socket(server);

io.on('connection', socket => {
	console.log(socket.id);

	socket.on('join_room', data => {
		// data = name of the room
		socket.join(data);
		console.log(`User joined room '${data}'`);
	});

	socket.on('send_message', data => {
		const { room, content } = data;

		// Everyone in the room will receive event
		console.log(data);
		socket.to(room).emit('receive_message', content);
	});

	socket.on('disconnect', () => {
		console.log('User disconnected');
	});
});