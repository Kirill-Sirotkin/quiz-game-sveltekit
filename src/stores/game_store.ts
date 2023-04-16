import { writable } from 'svelte/store';

export const answers_list = writable([
	{
		number: 0,
		text: 'placeholder answer'
	}
]);

export const question = writable('placeholder question');

export const timer = writable(10);
