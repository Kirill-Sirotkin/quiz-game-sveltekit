import { createWebSocketStore } from './stores/websocket_store';

const wsStore = createWebSocketStore();
wsStore.startWebsocket();
