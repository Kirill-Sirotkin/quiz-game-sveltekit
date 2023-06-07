<script lang="ts">
	import { createWebSocketStore } from "../stores/websocket_store";
	import type { Readable, Subscriber, Unsubscriber, Updater, Writable } from "svelte/store";
	import { AppState } from "../types/AppState";
	import { appStateStore } from "../stores/app_state_store";
	import UserForm from "../components/UserForm.svelte";
	import { Status } from "../types/Status";
	import Loader from "../components/Loader.svelte";

    const wsStore = createWebSocketStore();
    const wsStatusStore: Readable<Status> = {
		subscribe: wsStore.subscribeStatus,
	}

    $: switch($appStateStore) {
        case AppState.Room:
            console.log("Going to room...");
            break;
    };
</script>

{#if $wsStatusStore === Status.Ready}
    <UserForm />
{:else}
    <Loader />
{/if}