<script lang="ts">
	import { onMount } from "svelte";
	import PlayerCard from "../../components/PlayerCard.svelte";
	import { current_token, current_user } from "../../stores/current_user_store";
	import { useLanguageStore } from "../../stores/language_store";
	import { list } from "../../stores/user_list_store";
	import { browser } from "$app/environment";
	import { goto } from "$app/navigation";
	import Loader from "../../components/Loader.svelte";
	import { sendReconnectRoomMsg, sendStartGameMsg } from "../../services/message_send";
	import { appStateStore } from "../../stores/app_state_store";
	import { AppState } from "../../types/AppState";
	import { useWebSocketStore } from "../../stores/websocket_store";
	import type { Readable } from "svelte/store";
	import { Status } from "../../types/Status";
	import jwtDecode from "jwt-decode";
	import { is_token_user_info } from "../../services/message_receive";
	import GameArea from "../../components/GameArea.svelte";

    export let data;
    let loading = true;
    
    const wsStore = useWebSocketStore();
    const wsStatusStore: Readable<Status> = {
		subscribe: wsStore.subscribeStatus,
	}

    const checkToken = () => {
        if (!browser) return;
        // console.log($appStateStore)

        const token = localStorage.getItem('token');
        if (!token) {
            goto("/" + data.room_id + "/join");
            return;
        }
        if ($appStateStore === AppState.Room) return;
        sendReconnectRoomMsg(token);
        const token_info = jwtDecode(token);

        if (is_token_user_info(token_info)) {
            current_user.set(token_info);
            current_token.set(token);
        }
    }
    const startGame = () => {
        sendStartGameMsg({packPath:"./packs/dates.json", token: $current_token});
    }

    $: switch($wsStatusStore) {
        case Status.Ready:
            checkToken();
            break;
    }
    $: switch($appStateStore) {
        case AppState.Room:
            loading = false;
            break;
        case AppState.Error:
            goto("/" + data.room_id + "/join");
            appStateStore.set(AppState.Login);
            break;
    }
    $: isUserHost = $list.find(user => user.id === $current_user.id)?.isHost
    
    const langStore = useLanguageStore();
    const langStoreValue = {
		subscribe: langStore.subscribe,
	}
</script>

{#if loading}
    <Loader />
{:else}
    <div class="users-wrapper">
        <div class="list-and-start-button">
            {$langStoreValue.players}:
            <div class="secondary-wrapper player-list">
                {#each $list as user}
                    <PlayerCard
                        user = {user}
                    ></PlayerCard>
                {/each}
            </div>
            {#if isUserHost}
                <button class="start-button" on:click={startGame}>
                    {$langStoreValue.startGame}
                </button>
            {/if}
        </div>
        <div class="secondary-wrapper game-area">
            <GameArea />
        </div>
    </div>
{/if}

<style>
    .users-wrapper {
        display: flex;
        box-sizing: border-box;
        gap: 1rem;
        padding: 1rem;
        width: 100%;
        height: 100%;
    }
    .list-and-start-button {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        gap: 1rem;
        color: var(--text-primary);
        font-size: 2.5rem;
        height: 100%;
    }
    .secondary-wrapper {
        box-sizing: border-box;
        background-color: rgba(100, 100, 100, 0.4);
        border-radius: 0.5rem;
        border: 4px solid;
        border-color: rgba(100, 100, 100, 0.6);
        border-style: inset;
        padding: 1rem;
        color: var(--text-primary);
        font-size: 2.5rem;
        height: 100%;
    }
    .player-list {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        overflow: auto;
        min-width: 25%;
        height: 100%;
    }
    .game-area {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .start-button {
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        border-radius: 0.25rem;
        border-width: 2px;
        border-style: outset;
        border-color: rgba(100, 100, 100, 0.6);
        cursor: pointer;
        height: 4rem;
        line-height: 2.5rem;
        text-align: center;
        font-size: 2rem;
        background-color: rgba(100, 100, 100, 0.4);
        margin: 0 0.5rem 0.5rem 0.5rem;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        color: var(--text-primary);
        padding-bottom: 0.3rem;
    }
    .start-button:active {
        border-style: inset;
    }
</style>