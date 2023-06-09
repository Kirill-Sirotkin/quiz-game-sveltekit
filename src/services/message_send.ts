import { useWebSocketStore } from '../stores/websocket_store';

const wsStore = useWebSocketStore();

export const sendCreateRoomMsg = (userInfo: { name: string; avatarPath: string }) => {
	wsStore.sendCommand(
		JSON.stringify({ createRoom: { name: userInfo.name, avatarPath: userInfo.avatarPath } })
	);
};
export const sendJoinRoomMsg = (userInfo: { name: string; avatarPath: string; roomId: string }) => {
	wsStore.sendCommand(
		JSON.stringify({
			joinRoom: { name: userInfo.name, avatarPath: userInfo.avatarPath, roomId: userInfo.roomId }
		})
	);
};
export const sendReconnectRoomMsg = (token: string) => {
	wsStore.sendCommand(JSON.stringify({ reconnectRoom: {}, token: token }));
};
export const sendStartGameMsg = (gameInfo: { packPath: string; token: string }) => {
	wsStore.sendCommand(
		JSON.stringify({ startGame: { packPath: gameInfo.packPath }, token: gameInfo.token })
	);
};
export const sendAnswerMsg = (answerInfo: { num: number; token: string }) => {
	wsStore.sendCommand(
		JSON.stringify({ writeAnswer: { answer: answerInfo.num }, token: answerInfo.token })
	);
};
