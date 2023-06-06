<script lang="ts">
	import { onDestroy, onMount } from "svelte";
	import { createWebSocketStore } from "../stores/websocket_store";
	import type { Readable, Subscriber, Unsubscriber, Updater, Writable } from "svelte/store";
	import { AppState } from "../types/AppState";
	import { appStateStore } from "../stores/app_state_store";
	import Loading from "../components/Loading.svelte";
	import UserForm from "../components/UserForm.svelte";
	import { Status } from "../types/Status";
	import { themeStore } from "../stores/theme_store";
	import { browser } from "$app/environment";

    const wsStore = createWebSocketStore();
    const wsStatusStore: Readable<Status> = {
		subscribe: wsStore.subscribeStatus,
	}

    $: switch($appStateStore) {
        case AppState.Room:
            console.log("Going to room...");
            break;
    };

    $: console.log($themeStore);
</script>

<select bind:value={$themeStore} on:change={ (op) => { if (browser) localStorage.setItem("theme", op.currentTarget.value); } }>
    <option value="system">System</option>
    <option value="light">Light</option>
    <option value="dark">Dark</option>
</select>
{#if $wsStatusStore === Status.Ready}
    <UserForm />
{:else}
    <Loading />
{/if}