import { writable } from 'svelte/store';

export const current_user = writable({
	id: '',
	name: '',
	avatarPath: '',
	isHost: true,
	userColor: ''
});
