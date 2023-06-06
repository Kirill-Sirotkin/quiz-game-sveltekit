<script lang="ts">
	import { createWebSocketStore } from "../stores/websocket_store";

    const wsStore = createWebSocketStore();
    const startWS = () => {
        console.log("test...");
        wsStore.startWebsocket();
    }
    const sendWS = () => {
        console.log("sending...");
        wsStore.sendCommand();
    }
</script>

<button on:click={startWS}>Test</button>
<button on:click={sendWS}>Send</button>