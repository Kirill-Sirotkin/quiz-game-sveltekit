import { get, writable } from 'svelte/store';

import { Status } from '../types/Status';
import { handle_message } from '../services/message_receive';

const wsStore = writable<WebSocket>(undefined);
const statusStore = writable<Status>(Status.NotReady);

export const useWebSocketStore = () => {
	return {
		subscribeStatus: statusStore.subscribe,
		sendCommand: (msg: string) => {
			if (get(statusStore) !== Status.Ready) {
				console.log('WS NOT READY');
				return;
			}
			const ws = get(wsStore);
			ws.send(msg);
			console.log('Sending something...');
		},
		startWebsocket: async () => {
			if (get(statusStore) === Status.Ready) return;

			const ws = new WebSocket('ws://109.68.212.208/wsapi');
			statusStore.set(Status.Loading);

			ws.addEventListener('message', (message) => {
				const data: string = JSON.parse(message.data);
				handle_message(data);
			});
			const ws_connection = new Promise((resolve, reject) => {
				ws.onopen = () => {
					resolve(ws);
				};
				ws.onerror = (err) => {
					reject(err);
				};
			});
			await ws_connection.then(() => {
				wsStore.set(ws);
				statusStore.set(Status.Ready);

				setInterval(() => {
					console.log('heartbeat');
					if (ws.readyState <= 1) {
						ws.send(JSON.stringify({ heartbeat: {} }));
					}
				}, 10000);
			});
		}
	};
};
