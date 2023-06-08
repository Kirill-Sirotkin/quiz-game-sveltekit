<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

    export let settingsButton = true;
    export let interactable = false;
    export let avatarImage = "default.png";

    $: avatarPath = "/src/content/" + avatarImage;

    const handleAvatarInteract = () => {
        dispatch('interact', {
            avatar: avatarImage
        });
    }
    const handleAvatarSettings = () => {
        dispatch('settings', {});
    }
</script>

<div class="avatar-wrapper">
    <img src={avatarPath} style="--frame-color=rgb(0, 27, 66)" alt="avatar">
    {#if interactable}
        <button class="interact-hitbox {interactable ? "pointer" : "" }" on:click={handleAvatarInteract}></button>
    {/if}
    {#if settingsButton}
        <button class="settings-button pointer" on:click={handleAvatarSettings}>
            ⚙️
        </button>
    {/if}
</div>

<style>
    * {
        padding: 0;
        margin: 0;
    }
    img {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        border: 4px solid;
        border-color: var(--frame-color);
        border-radius: 1rem;
    }
    .avatar-wrapper {
        display: flex;
        position: relative;
        width: 100%;
        height: 100%;
        background-color: rgba(186, 205, 218, 0);
    }
    .pointer {
        cursor: pointer;
    }
    .settings-button {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 6rem;
        left: 6rem;
        width: 3rem;
        height: 3rem;
        line-height: 3rem;
        border-radius: 50%;
        text-align: center;
        font-size: 2rem;
        border: 4px solid var(--text-primary);
        background-color: rgb(255, 255, 255);
        transition: transform .1s ease-in-out;
    }
    .settings-button:hover {
        transform: rotate(45deg);
    }
    .interact-hitbox {
        position: absolute;
        height: 100%;
        width: 100%;
        background-color: rgba(255, 255, 255, 0);
        border: 0;
    }
</style>