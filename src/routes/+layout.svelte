<script lang="ts">
	import { onMount } from "svelte";
	import { themeStore } from "../stores/theme_store";
	import { browser } from "$app/environment";
    
    // $: if (browser) localStorage.setItem("theme", $themeStore);

    onMount(() => {
        if (!browser) return;
        const theme = localStorage.getItem("theme");
        if (theme != null) switch (theme) {
            case 'system':
                themeStore.set('system');
                break;
            case 'dark':
                themeStore.set('dark');
                break;
            case 'light':
                themeStore.set('light');
                break;
        }
    })
</script>

<svelte:head>
    <meta name="color-scheme" content={$themeStore === 'system' ? 'light dark' : $themeStore } />
    <link rel="stylesheet" href={`src/styles/${$themeStore}Theme.css`} />
</svelte:head>
<div class="wrapper">
    <slot />
</div>


<style>
	/* :global(body) {
		height: 100vh;
		margin: 0;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
		background-color: rgb(11, 11, 16);
		background-image: url("/src/content/repeated-square-dark.webp");
		animation: bg-move linear infinite 45s;
	} */
    /* .wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 4rem;
        height: 100%;
        width: 100%;
    } */
	@keyframes bg-move {
		100% {
			background-position: 400px 400px;
		}
	}
</style>