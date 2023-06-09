<script lang="ts">
	import type { Readable } from "svelte/store";
	import { useWebSocketStore } from "../../../stores/websocket_store";
	import { appStateStore } from "../../../stores/app_state_store";
	import { AppState } from "../../../types/AppState";
	import { current_user } from "../../../stores/current_user_store";
	import { goto } from "$app/navigation";
	import UserForm from "../../../components/UserForm.svelte";
	import Loader from "../../../components/Loader.svelte";
	import { Status } from "../../../types/Status";
	import { sendJoinRoomMsg } from "../../../services/message_send";

    export let data;

    const wsStore = useWebSocketStore();
    const wsStatusStore: Readable<Status> = {
		subscribe: wsStore.subscribeStatus,
	}

    $: switch($appStateStore) {
        case AppState.Room:
            // console.log("Going to room...");
            goto("/" + $current_user.roomId);
            break;
        case AppState.Error:
            goto("/");
            break;
    };

    const handleFormSubmit = (event: { detail: { avatar: string; name: string }; }) => {
        sendJoinRoomMsg({name: event.detail.name, avatarPath: event.detail.avatar, roomId: data.room_id});
        localStorage.setItem('lastName', event.detail.name);
        localStorage.setItem('lastAvatar', event.detail.avatar);
    }
</script>

{#if $wsStatusStore === Status.Ready}
    <UserForm on:submitUserForm={handleFormSubmit} />
{:else}
    <Loader />
{/if}