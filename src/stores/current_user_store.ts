import { writable } from 'svelte/store';

export const current_user = writable({
	id: '',
	name: '',
	avatarPath: 'default.png',
	roomId: '',
	isHost: true,
	userColor: ''
});

export const current_token = writable('');
