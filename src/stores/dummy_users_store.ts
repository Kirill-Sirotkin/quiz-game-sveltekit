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
	// {
	// 	id: '4',
	// 	name: 'zhopich1',
	// 	avatarPath: 'zhopich.png',
	// 	isHost: false,
	// 	userColor: '#AAAAAA'
	// },
	// {
	// 	id: '5',
	// 	name: 'zhopich2',
	// 	avatarPath: 'zhopich.png',
	// 	isHost: false,
	// 	userColor: '#AAAAAA'
	// },
	// {
	// 	id: '6',
	// 	name: 'zhopich3',
	// 	avatarPath: 'zhopich.png',
	// 	isHost: false,
	// 	userColor: '#AAAAAA'
	// }
	// {
	// 	id: '7',
	// 	name: 'zhopich4',
	// 	avatarPath: 'zhopich.png',
	// 	isHost: false,
	// 	userColor: '#AAAAAA'
	// },
	// {
	// 	id: '8',
	// 	name: 'zhopich5',
	// 	avatarPath: 'zhopich.png',
	// 	isHost: false,
	// 	userColor: '#AAAAAA'
	// },
	// {
	// 	id: '9',
	// 	name: 'zhopich6',
	// 	avatarPath: 'zhopich.png',
	// 	isHost: false,
	// 	userColor: '#AAAAAA'
	// },
	// {
	// 	id: '10',
	// 	name: 'zhopich7',
	// 	avatarPath: 'zhopich.png',
	// 	isHost: false,
	// 	userColor: '#AAAAAA'
	// }
]);
