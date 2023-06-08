<script lang="ts">
	import { browser } from "$app/environment";
	import type { Readable } from "svelte/store";
	import { sendCreateRoomMsg } from "../services/message_send";
	import { useLanguageStore } from "../stores/language_store";
	import { getSystemTheme, themeStore } from "../stores/theme_store";
	import { useWebSocketStore } from "../stores/websocket_store";
    import Avatar from "./Avatar.svelte";
	import AvatarPanel from "./AvatarPanel.svelte";
	import InputField from "./InputField.svelte";
	import { createEventDispatcher } from 'svelte';
	import { Status } from "../types/Status";
	import { appStateStore } from "../stores/app_state_store";
	import { AppState } from "../types/AppState";

	const dispatch = createEventDispatcher();

    const getLastAvatar = () => {
        if (!browser) return;
        const avatar = localStorage.getItem('lastAvatar');
        return avatar ? avatar : "default.png";
    }
    const getLastName = () => {
        if (!browser) return;
        const name = localStorage.getItem('lastName');
        return name ? name : undefined;
    }

    let selectedAvatar = getLastAvatar();
    let inputText = getLastName();
    let choosingAvatar = false;
    let inputDisabled = false;
    let hideErrorMsg = true;
    
    $: theme = $themeStore === 'system' ? getSystemTheme() : $themeStore;
    $: submitError = $langStoreValue.enterNameError;
    $: switch($appStateStore) {
        case AppState.Error:
            console.log("error from user form");
            inputDisabled = false;
            break;
    }

    const langStore = useLanguageStore();
    const langStoreValue = {
		subscribe: langStore.subscribe,
	}

    const handleAvatarInteract = (event: { detail: { avatar: any; }; }) => {
        selectedAvatar = event.detail.avatar;
        choosingAvatar = false;
    }
    const handlePanelClose = () => {
        choosingAvatar = false;
    }
    const submitUser = () => {
        hideErrorMsg = true;
        if (!inputText) {
            hideErrorMsg = false;
            return;
        }
        if (inputDisabled) return;
        inputDisabled = true;
        dispatch('submitUserForm', {
            avatar: selectedAvatar,
            name: inputText
        });
    }
</script>

{#if !choosingAvatar}
    <div class="avatar-wrapper">
        <Avatar 
            settingsButton={true} 
            avatarImage={selectedAvatar} 
            on:settings={() => {choosingAvatar = true;}}
            --frame-color = "var(--text-primary)"
        />
    </div>
    <form class="input-wrapper fade-in" on:submit|preventDefault={submitUser}>
        <InputField 
            bind:inputText
            isDisabled = {inputDisabled}
            formText=""
            formPlaceholder={$langStoreValue.enterNamePlaceholder}
        />
        <input type="submit" value="" disabled={inputDisabled} />
        <img 
            class="submit-name-button" 
            src="/src/content/{theme}Theme/arrow_right_circle_icon.svg" 
            alt="submit name button" 
            on:click={submitUser}
            on:keydown={submitUser}
        />
    </form>
    <div class="submit-error {!hideErrorMsg ? "" : "hidden" }">
        {submitError.toUpperCase()}
    </div>
{:else}
    <div class="panel-wrapper fade-in">
        <AvatarPanel on:interact={handleAvatarInteract} on:modal={handlePanelClose} />
    </div>
{/if}

<style>
    input {
        all: unset;
    }
    .avatar-wrapper {
        width: 8rem;
        height: 8rem;
        animation: fadeIn 0.25s;
        margin-bottom: 2.5rem;
    }
    .fade-in {
        animation: fadeIn 0.25s;
    }
    .panel-wrapper {
        width: 100%;
        height: 100%;
    }
    .input-wrapper {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
    }
    .submit-name-button {
        position: absolute;
        left: 16.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 2.5rem;
        height: 2.5rem;
        transition-duration: 0.05s;
        cursor: pointer;
    }
    .submit-name-button:hover {
        transform: scale(1.05);
    }
    .submit-error {
        margin-top: 0.5rem;
        font-size: 12px;
        font-weight: bold;
        color: red;
    }
    .hidden {
        visibility: hidden;
    }
    @keyframes fadeIn {
        0% { 
            opacity: 0; 
        }
        100% { 
            opacity: 1; 
        }
    }
</style>