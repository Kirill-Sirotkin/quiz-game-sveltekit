import { writable } from 'svelte/store';
import { GameState } from '../types/GameState';

interface correctAnswersList {
	answers: unknown[];
	players: unknown[];
	correctAnswer: number;
}

interface scoresList {
	scores: unknown[];
	players: unknown[];
}

export const answers_list = writable([
	{
		number: 0,
		text: 'placeholder answer'
	}
]);

export const question = writable('placeholder question');

export const timer = writable(0);

export const gameState = writable(GameState.Idle);

export const correctAnswers = writable<correctAnswersList>({
	answers: [''],
	players: [''],
	correctAnswer: -1
});

export const scores = writable<scoresList>({
	scores: [''],
	players: ['']
});
