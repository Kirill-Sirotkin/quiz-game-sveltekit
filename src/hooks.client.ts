import { socket, socket_message } from './stores/websocket_store';
import { handle_message } from './services/message_receive';

const ws = new WebSocket('ws://109.68.212.208/wsapi');
console.log('CLIENT! 1/5');

ws.addEventListener('message', (message) => {
	const data: string = JSON.parse(message.data);
	socket_message.update(() => data);
});

socket_message.subscribe((message) => {
	handle_message(message);
});

console.log('PROMISE! 2/5');

const ws_connection = new Promise(function (resolve, reject) {
	ws.onopen = () => {
		resolve(ws);
	};
	ws.onerror = (err) => {
		reject(err);
	};
});

console.log('SOCKET! 3/5');

console.log('AWAIT CONNECTION! 4/5');

await ws_connection.then(() => {
	console.log('setting setinterval 5/5');

	socket.update(() => ws);

	setInterval(() => {
		console.log('heartbeat');
		if (ws.readyState <= 1) {
			ws.send(JSON.stringify({ heartbeat: {} }));
		}
	}, 500);
});
