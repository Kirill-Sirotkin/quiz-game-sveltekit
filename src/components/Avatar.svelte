<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

    export let settings_button = true;
    export let interactable = false;
    export let avatar_image = "default.png";

    $: avatar_path = "/src/content/" + avatar_image;

    function avatar_interact() {
        dispatch('interact', {
            avatar: avatar_image
        });
    }
    function avatar_settings() {
        dispatch('settings', {});
    }
</script>

<div class="wrapper">
    <img src={avatar_path} style="--frame-color=rgb(0, 27, 66)" alt="avatar">
    {#if interactable}
    <button class="interact-hitbox" on:click={avatar_interact}></button>
    {/if}
    {#if settings_button}
    <button class="settings-button" on:click={avatar_settings}>
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
    .wrapper {
        display: flex;
        position: relative;
        width: 100%;
        height: 100%;
        background-color: rgba(186, 205, 218, 0);
    }
    .settings-button {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 6rem;
        left: 6rem;
        cursor: pointer;
        width: 3rem;
        height: 3rem;
        line-height: 3rem;
        border-radius: 50%;
        text-align: center;
        font-size: 2rem;
        border: 4px solid rgb(0, 27, 66);
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