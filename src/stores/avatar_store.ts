import { readable } from 'svelte/store';

const list = [
	'default.png',
	'billy.png',
	'despair.png',
	'enid.png',
	'sreda.png',
	'ghoul.png',
	'kakyoin.png',
	'makima.png',
	'megumin.png',
	'oshino.png',
	'gigawojak.png',
	'joker.png',
	'rompompom.png',
	'shrek.png',
	'zhopich.png',
	'mads.png'
];

export const avatarList = readable(list, function start(set) {
	set(list);
});
