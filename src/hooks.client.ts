import { socket, socket_message } from './stores/websocket_store';

console.log('APP!!!!!!');

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

ws.addEventListener('message', (message: any) => {
	// Parse the incoming message here
	const data: string = JSON.parse(message.data);
	// Update the state. That's literally it. This can happen from anywhere:
	// we're not in a component, and there's no nested context.
	socket_message.update(() => data);
});

ws_connection.then(() => {
	setInterval(() => {
		console.log('heartbeat');
		if (ws.readyState <= 1) {
			ws.send('message');
		}
	}, 10000);
});
