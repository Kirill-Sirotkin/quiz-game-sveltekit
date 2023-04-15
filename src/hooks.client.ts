import { socket, socket_message } from './stores/websocket_store';
import { handle_message } from './services/message_receive';

const ws = new WebSocket('ws://109.68.212.208/wsapi');

ws.onopen = () => {
	console.log('connected!');
};

const ws_connection = new Promise(function (resolve, reject) {
	ws.onopen = () => {
		resolve(ws);
	};
	ws.onerror = (err) => {
		reject(err);
	};
});

socket.update(() => ws);

ws.addEventListener('message', (message) => {
	const data: string = JSON.parse(message.data);
	socket_message.update(() => data);
});

ws_connection.then(() => {
	setInterval(() => {
		console.log('heartbeat');
		if (ws.readyState <= 1) {
			ws.send(JSON.stringify({ heartbeat: {} }));
		}
	}, 10000);
});

socket_message.subscribe((message) => {
	handle_message(message);
});
