import { writable } from 'svelte/store';

export const user_list = writable([
	{
		id: '1',
		name: 'rompompom',
		avatarPath: 'rompompom.png',
		isHost: false,
		userColor: '#FF0000'
	},
	{
		id: '2',
		name: 'sreda',
		avatarPath: 'sreda.png',
		isHost: false,
		userColor: '#AB1000'
	},
	{
		id: '3',
		name: 'zhopich',
		avatarPath: 'zhopich.png',
		isHost: false,
		userColor: '#AAAAAA'
	}
]);
