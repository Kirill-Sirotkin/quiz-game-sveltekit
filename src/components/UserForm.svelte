<script lang="ts">
	import { getSystemTheme, themeStore } from "../stores/theme_store";
    import Avatar from "./Avatar.svelte";
	import AvatarPanel from "./AvatarPanel.svelte";
	import InputField from "./InputField.svelte";

    let selectedAvatar = "default.png";
    let choosingAvatar = false;
    let inputText = "";
    let inputDisabled = false;
    
    $: theme = $themeStore === 'system' ? getSystemTheme() : $themeStore;

    const handleAvatarInteract = (event: { detail: { avatar: any; }; }) => {
        selectedAvatar = event.detail.avatar;
        choosingAvatar = false;
    }
    const handlePanelClose = () => {
        choosingAvatar = false;
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
    <div class="input-wrapper fade-in">
        <InputField 
            bind:inputText
            isDisabled = {inputDisabled}
            formText=""
            formPlaceholder="Enter your name"
        />
        <img class="submit-name-button" src="/src/content/{theme}Theme/arrow_right_circle_icon.svg" alt="submit name button" />
    </div>
{:else}
    <div class="panel-wrapper fade-in">
        <AvatarPanel on:interact={handleAvatarInteract} on:modal={handlePanelClose} />
    </div>
{/if}

<style>
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
        cursor: pointer;
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