<script lang="ts">
	import { useLanguageStore } from "../stores/language_store";
	import { scores } from "../stores/game_store";
    import Avatar from "./Avatar.svelte";
	import { current_user } from "../stores/current_user_store";

    export let user: {id:string, name:string, avatarPath:string, isHost:boolean, userColor:string};

    const langStore = useLanguageStore();
    const langStoreValue = {
        subscribe: langStore.subscribe,
    }

    $: playerIndex = $scores.players.indexOf(user.id);
    $: score = playerIndex >= 0 ? $scores.scores[playerIndex] : 0;
</script>

<div class="player-card">
    <div class="avatar-wrapper">
        <Avatar
            settingsButton={false} 
            avatarImage={user?.avatarPath}
            --frame-color ={user?.userColor}
        ></Avatar>
    </div>
    <div class="name-wrapper">
        {user?.name}
    </div>
    <div class="score-wrapper">
        {$langStoreValue.score}:
        <div>
            {score}
        </div>
    </div>
    {#if user?.isHost}
        <div class="host-icon">
            👑
        </div>
    {/if}
</div>

<style>
    .player-card {
        display: flex;
        align-items: center;
        position: relative;
        gap: 0.5rem;
        background-color: var(--color-primary);
        border-radius: 0.5rem;
        border: 3px solid;
        border-style: outset;
        border-color: var(--text-primary);
        padding: 0.5rem;
        box-sizing: border-box;
        color: var(--text-primary);
    }
    .avatar-wrapper {
        width: 4rem;
        height: 4rem;
    }
    .name-wrapper {
        overflow: hidden;
        font-size: 1.5rem;
        width: 10rem;
    }
    .score-wrapper {
        display: flex;
        flex-direction: column;
        gap: 0.3rem;
        align-items: end;
        font-size: 1.5rem;
    }
    .host-icon {
        position: absolute;
        font-size: 2rem;
        bottom: 3.5rem;
        left: 1.2rem;
    }
</style>