<script lang="ts">
	import { useWebSocketStore } from "../stores/websocket_store";
	import type { Readable, Subscriber, Unsubscriber, Updater, Writable } from "svelte/store";
	import { AppState } from "../types/AppState";
	import { appStateStore } from "../stores/app_state_store";
	import UserForm from "../components/UserForm.svelte";
	import { Status } from "../types/Status";
	import Loader from "../components/Loader.svelte";
	import { goto } from "$app/navigation";
	import { current_user } from "../stores/current_user_store";
	import { sendCreateRoomMsg } from "../services/message_send";

    const wsStore = useWebSocketStore();
    const wsStatusStore: Readable<Status> = {
		subscribe: wsStore.subscribeStatus,
	}

    $: switch($appStateStore) {
        case AppState.Room:
            // console.log("Going to room...");
            goto("/" + $current_user.roomId);
            break;
    };

    const handleFormSubmit = (event: { detail: { avatar: string; name: string }; }) => {
        sendCreateRoomMsg({name: event.detail.name, avatarPath: event.detail.avatar});
        localStorage.setItem('lastName', event.detail.name);
        localStorage.setItem('lastAvatar', event.detail.avatar);
    }
</script>

{#if $wsStatusStore === Status.Ready}
    <UserForm on:submitUserForm={handleFormSubmit} />
{:else}
    <Loader />
{/if}