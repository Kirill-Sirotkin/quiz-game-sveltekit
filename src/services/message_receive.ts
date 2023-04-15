import { list } from '../stores/user_list_store';

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

type Response = ErrorResponse | CreateRoomResponse | JoinRoomResponse | UpdateUserList;

export function handle_message(message: string) {
	try {
		const resp: Response = JSON.parse(JSON.stringify(message));
		console.log(resp);

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
			default:
				console.log('unknown response!: ' + resp.response);
				break;
		}
	} catch (error) {
		console.log(error);
		return;
	}
}

function handle_error(resp: ErrorResponse) {
	// const data: ErrorResponse = resp;
	console.log(resp.data.errorText);
}

function handle_createRoom(resp: CreateRoomResponse) {
	console.log('create!: ' + resp);
	list.update(() => resp.data.userList);
}

function handle_joinRoom(resp: JoinRoomResponse) {
	console.log('join!: ' + resp);
	list.update(() => resp.data.userList);
}

function handle_userList(resp: UpdateUserList) {
	console.log('users!: ' + resp);
	list.update(() => resp.data.userList);
}
