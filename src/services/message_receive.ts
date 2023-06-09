import { list } from '../stores/user_list_store';
import jwtDecode from 'jwt-decode';
import { current_token, current_user } from '../stores/current_user_store';
import { appStateStore } from '../stores/app_state_store';
import { AppState } from '../types/AppState';
import { useErrorAlert } from '../stores/error_alert_store';
import { browser } from '$app/environment';
import {
	answers_list,
	correctAnswers,
	gameState,
	question,
	scores,
	timer
} from '../stores/game_store';
import { GameState } from '../types/GameState';

const errorAlertStore = useErrorAlert();

type TokenUserInfo = {
	id: string;
	name: string;
	avatarPath: string;
	exp: number;
	isHost: boolean;
	roomId: string;
	userColor: string;
};

type ErrorResponse = {
	response: string;
	data: {
		errorCode: number;
		errorText: string;
	};
};

type CreateRoomResponse = {
	response: string;
	data: {
		token: string;
		userList: {
			id: string;
			name: string;
			avatarPath: string;
			roomId: string;
			isHost: boolean;
			userColor: string;
		}[];
	};
};

type JoinRoomResponse = {
	response: string;
	data: {
		token: string;
		userList: {
			id: string;
			name: string;
			avatarPath: string;
			roomId: string;
			isHost: boolean;
			userColor: string;
		}[];
	};
};

type UpdateUserList = {
	response: string;
	data: {
		userList: {
			id: string;
			name: string;
			avatarPath: string;
			roomId: string;
			isHost: boolean;
			userColor: string;
		}[];
	};
};

type StartGame = {
	response: string;
	data: object;
};

type QuestionResponse = {
	response: string;
	data: {
		question: string;
	};
};

type AnswersResponse = {
	response: string;
	data: {
		answers: {
			number: number;
			text: string;
		}[];
	};
};

type TimerResponse = {
	response: string;
	data: {
		timer: number;
	};
};

type CorrectAnswerResponse = {
	response: string;
	data: {
		answers: object;
		correctAnswer: number;
	};
};

type ScoresResponse = {
	response: string;
	data: {
		scores: object;
	};
};

type Response =
	| ErrorResponse
	| CreateRoomResponse
	| JoinRoomResponse
	| UpdateUserList
	| StartGame
	| QuestionResponse
	| AnswersResponse
	| TimerResponse
	| CorrectAnswerResponse
	| ScoresResponse;

export const handle_message = (message: string) => {
	try {
		const resp: Response = JSON.parse(JSON.stringify(message));
		// console.log(resp);

		switch (resp.response) {
			case 'errorResponse':
				handle_error(resp as ErrorResponse);
				break;
			case 'createRoomResponse':
				handle_createRoom(resp as CreateRoomResponse);
				break;
			case 'joinRoomResponse':
				handle_joinRoom(resp as JoinRoomResponse);
				break;
			case 'updateUserList':
				handle_userList(resp as UpdateUserList);
				break;
			case 'startGame':
				handle_startGame();
				break;
			case 'questionResponse':
				handle_questionResponse(resp as QuestionResponse);
				break;
			case 'answersResponse':
				handle_answersResponse(resp as AnswersResponse);
				break;
			case 'timerResponse':
				handle_timerResponse(resp as TimerResponse);
				break;
			case 'correctAnswerResponse':
				handle_correctAnswerResponse(resp as CorrectAnswerResponse);
				break;
			case 'scoresResponse':
				handle_scoresResponse(resp as ScoresResponse);
				break;
			default:
				console.log('unknown response!: ' + resp.response);
				break;
		}
	} catch (error) {
		console.log(error);
		return;
	}
};

const handle_error = (resp: ErrorResponse) => {
	errorAlertStore.addError(resp.data.errorText, resp.data.errorCode);
	if (resp.data.errorCode === 2) {
		appStateStore.set(AppState.Error);
		if (browser) localStorage.removeItem('token');
	}
	if (resp.data.errorText === 'Room does not exist') {
		appStateStore.set(AppState.Error);
		if (browser) localStorage.removeItem('token');
	}
	if (resp.data.errorText === 'Game is in progress') {
		appStateStore.set(AppState.Error);
	}
};

const handle_createRoom = (resp: CreateRoomResponse) => {
	// console.log('create!: ' + resp);
	list.set(resp.data.userList);

	const token_info = jwtDecode(resp.data.token);

	if (is_token_user_info(token_info)) {
		current_token.set(resp.data.token);
		current_user.set(token_info);
		localStorage.setItem('token', resp.data.token);
	}

	appStateStore.set(AppState.Room);
};

export const is_token_user_info = (value: unknown): value is TokenUserInfo => {
	return value !== null && value !== undefined && typeof value === 'object' && 'id' in value;
};

const handle_joinRoom = (resp: JoinRoomResponse) => {
	// console.log('join!: ' + resp);
	list.set(resp.data.userList);

	const token_info = jwtDecode(resp.data.token);

	if (is_token_user_info(token_info)) {
		current_token.set(resp.data.token);
		current_user.set(token_info);
		localStorage.setItem('token', resp.data.token);
	}

	appStateStore.set(AppState.Room);
};

const handle_userList = (resp: UpdateUserList) => {
	// console.log('users!: ' + resp);
	list.set(resp.data.userList);

	appStateStore.set(AppState.Room);
};

const handle_startGame = () => {
	// console.log('start game');
	scores.set({ scores: [''], players: [''] });
};

const handle_questionResponse = (resp: QuestionResponse) => {
	gameState.set(GameState.Question);
	question.set(resp.data.question);
};

const handle_answersResponse = (resp: AnswersResponse) => {
	gameState.set(GameState.Answers);
	answers_list.set(resp.data.answers);
};

const handle_timerResponse = (resp: TimerResponse) => {
	timer.set(resp.data.timer);
};

const handle_correctAnswerResponse = (resp: CorrectAnswerResponse) => {
	correctAnswers.set({
		answers: Object.values(resp.data.answers),
		players: Object.getOwnPropertyNames(resp.data.answers),
		correctAnswer: resp.data.correctAnswer
	});
	gameState.set(GameState.CorrectAnswer);
};

const handle_scoresResponse = (resp: ScoresResponse) => {
	scores.set({
		scores: Object.values(resp.data.scores),
		players: Object.getOwnPropertyNames(resp.data.scores)
	});
};
