<script lang="ts">
	import { useLanguageStore } from "../stores/language_store";
	import { getSystemTheme, themeStore } from "../stores/theme_store";
	import { Language } from "../types/Language";

    $: theme = $themeStore === 'system' ? getSystemTheme() : $themeStore;

    let selectingLanguage = false;
    const langStore = useLanguageStore();
    
    const switchToDark = () => {
        themeStore.set('dark');
    }
    const switchToLight = () => {
        themeStore.set('light');
    }
    const toggleLanguageSelect = () => {
        selectingLanguage = !selectingLanguage;
    }
</script>

<div class="bar">
    <div class="logo-wrapper">
        QUIZ GAME
    </div>
    <div class="buttons-wrapper">
        {#if theme === 'light'}
            <img 
                class="settings-icon" 
                src="/src/content/lightTheme/sun_icon.svg" 
                alt="theme select icon" 
                on:click={switchToDark} 
                on:keydown={switchToDark} 
            />
        {:else}
            <img 
                class="settings-icon" 
                src="/src/content/darkTheme/moon_icon.svg" 
                alt="theme select icon" 
                on:click={switchToLight} 
                on:keydown={switchToLight} 
            />
        {/if}
        <div class="language-select">
            <img 
                class="settings-icon" 
                src="/src/content/{theme}Theme/globe_icon.svg" 
                alt="language select icon" 
                on:click={toggleLanguageSelect} 
                on:keydown={toggleLanguageSelect} 
            />
            {#if selectingLanguage}
                <div class="language-select-menu">
                    <div class="language-select-options">
                        <img 
                            class="settings-icon" 
                            src="/src/content/gb.svg" 
                            alt="language select icon" 
                            on:click={() => {
                                toggleLanguageSelect();
                                langStore.setLanguage(Language.english)
                            }} 
                            on:keydown={() => {
                                toggleLanguageSelect();
                                langStore.setLanguage(Language.english)
                            }} 
                        />
                        <img 
                            class="settings-icon" 
                            src="/src/content/ru.svg" 
                            alt="language select icon" 
                            on:click={() => {
                                toggleLanguageSelect();
                                langStore.setLanguage(Language.russian)
                            }} 
                            on:keydown={() => {
                                toggleLanguageSelect();
                                langStore.setLanguage(Language.russian)
                            }} 
                        />
                    </div>
                </div>
            {/if}
        </div>
    </div>
</div>

<style>
    .bar {
        display: flex;
        justify-content: space-between;
        background: rgb(131,58,180);
        background: linear-gradient(135deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%);
        font-size: 2rem;
    }
    .logo-wrapper {
        padding: 1rem;
        margin-left: 0.5rem;
        color: var(--text-inverse);
        font-weight: bolder;
        cursor: default;
    }
    .buttons-wrapper {
        display: flex;
        align-items: center;
        padding: 0.5rem;
        gap: 1.5rem;
        margin-right: 1rem;
    }
    .settings-icon {
        width: 36px;
        height: 36px;
        transition-duration: 0.08s;
        cursor: pointer;
    }
    .settings-icon:hover {
        transform: scale(1.15);
    }
    .language-select {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .language-select-menu {
        position: absolute;
        right: -12px;
        top: 4rem;
        width: 4rem;
        height: 7rem;
        overflow: hidden;
    }
    .language-select-options {
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem;
        box-sizing: border-box;
        width: 3.75rem;
        height: 6.25rem;
        background-color: rgba(108, 108, 108, 0.5);
        border-radius: 0.5rem;
        border: 2px solid var(--text-primary);
        animation: slide 0.1s forwards;
    }
    @keyframes slide {
        0% {
            right: -10rem;
        }
        100% {
            right: 0;
        }
    }
</style>