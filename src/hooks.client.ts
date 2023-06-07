import { useWebSocketStore } from './stores/websocket_store';

const wsStore = useWebSocketStore();
wsStore.startWebsocket();
