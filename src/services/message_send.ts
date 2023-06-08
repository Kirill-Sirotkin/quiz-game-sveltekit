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
