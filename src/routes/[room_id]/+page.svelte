<script lang="ts">
    import { user_list } from '../../stores/dummy_users_store.js';
    import { current_user } from '../../stores/current_user_store.js';
    import PlayerCard from '../../components/PlayerCard.svelte';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

    export let data;

    onMount(() => {
        if (browser) {
        if (!localStorage.getItem("token")) {
            console.log("No token!");
            goto("/" + data.room_id + "/join");
        } else {
            console.log("all ok");
        }
        } else {
        goto("/" + data.room_id);
        }
	});

    let users: {id:string, name:string, avatarPath:string, isHost:boolean, userColor:string}[];
    let c_user: {id:string, name:string, avatarPath:string, isHost:boolean, userColor:string};

    user_list.subscribe((value) => {
            users = value;
            });
        current_user.subscribe((value) => {
            c_user = value;
            });

    let is_user_host = false;
    $: if (users?.find(element => element?.id === c_user.id)?.isHost) {
        is_user_host = true;
    } else {
        is_user_host = false;
    }

    user_list.update((list) => [...list, c_user]);
</script>

<div class="wrapper">
    <div class="list-and-start-button">
        <div class="secondary-wrapper player-list">
            Players:
            {#each users as user}
                <PlayerCard
                    user = {user}
                ></PlayerCard>
            {/each}
        </div>
        {#if is_user_host}
            <button class="start-button">
                Start game
            </button>
        {/if}
    </div>
    <div class="secondary-wrapper game-area">

    </div>
</div>

<style>
    .wrapper {
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
    }
    .secondary-wrapper {
        box-sizing: border-box;
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 0.5rem;
        border: 4px solid;
        border-color: rgba(0, 0, 0, 0.4);
        border-style: inset;
        padding: 1rem;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        color: beige;
        font-size: 2.5rem;
    }
    .player-list {
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
    }
    .start-button {
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        border-radius: 0.25rem;
        border-width: 2px;
        border-style: outset;
        border-color: -internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133));
        cursor: pointer;
        height: 4rem;
        line-height: 2.5rem;
        text-align: center;
        font-size: 2rem;
        background-color: rgba(0, 0, 0, 0.2);
        margin-left: 0.5rem;
        margin-right: 0.5rem;
        margin-bottom: 1rem;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        color: beige;
    }
    .start-button:active {
        border-style: inset;
    }
</style>