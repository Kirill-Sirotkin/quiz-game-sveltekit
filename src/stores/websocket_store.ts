import { writable } from 'svelte/store';

// Create a new store with the given data.
export const socket = writable<WebSocket>(undefined);
export const socket_message = writable<string>('');

export const sendMessage = (message: string, ws: WebSocket) => {
	if (ws.readyState <= 1) {
		ws.send(message);
	}
};
