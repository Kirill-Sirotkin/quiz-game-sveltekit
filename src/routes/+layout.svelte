<script lang="ts">
	import BottomBar from "../components/BottomBar.svelte";
import TopBar from "../components/TopBar.svelte";
import { themeStore } from "../stores/theme_store";
</script>

<svelte:head>
    <meta name="color-scheme" content={$themeStore === 'system' ? 'light dark' : $themeStore } />
    <link rel="stylesheet" href={`../styles/${$themeStore}Theme.css`} />
    <title>Quiz Game</title>
</svelte:head>
<div class="app-layout">
    <TopBar />
    <div class="wrapper">
        <slot />
    </div>
    <BottomBar />
</div>

<style>
    .app-layout {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        width: 100%;
    }
</style>