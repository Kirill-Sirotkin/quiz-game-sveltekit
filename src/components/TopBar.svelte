<script lang="ts">
	import { themeStore } from "../stores/theme_store";
	import { browser } from "$app/environment";
	import type { Theme } from "../types/Theme";

    $: theme = $themeStore === 'system' ? getSystemTheme() : $themeStore;

    const getSystemTheme = (): Theme => {
        if (!browser) return 'dark';
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark'
        } else {
            return 'light'
        }
    }
    const switchToDark = () => {
        themeStore.set('dark');
    }
    const switchToLight = () => {
        themeStore.set('light');
    }
</script>

<div class="bar">
    <div class="logo-wrapper">
        QUIZ GAME
    </div>
    <div class="buttons-wrapper">
        {#if theme === 'light'}
            <img src="/src/content/lightTheme/sun_icon.svg" alt="theme select icon" on:click={switchToDark} on:keydown={switchToDark} />
        {:else}
            <img src="/src/content/darkTheme/moon_icon.svg" alt="theme select icon" on:click={switchToLight} on:keydown={switchToLight} />
        {/if}
        <img src="/src/content/{theme}Theme/globe_icon.svg" alt="language select icon" />
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
    }
    .buttons-wrapper {
        display: flex;
        align-items: center;
        padding: 0.5rem;
        gap: 1.5rem;
        margin-right: 1rem;
    }
    img {
        width: 36px;
        height: 36px;
    }
</style>