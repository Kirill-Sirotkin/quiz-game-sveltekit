import { writable } from 'svelte/store';

export const list = writable([
	{
		id: '',
		name: '',
		avatarPath: 'default.png',
		roomId: '',
		isHost: false,
		userColor: ''
	}
]);
