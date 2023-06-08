<script lang="ts">
	import { useErrorAlert } from "../stores/error_alert_store";
	import { getSystemTheme, themeStore } from "../stores/theme_store";
    
    const errorStore = useErrorAlert();
    const errors = { subscribe: errorStore.subscribe };
    $: theme = $themeStore === 'system' ? getSystemTheme() : $themeStore;
</script>

<div class="bar">
    <div class="errors">
        {#each $errors as err}
            <div class="element">
                <div class="text">
                    {err.errorText}
                </div>
                <div class="code">
                    {err.errorCode}
                </div>
                <img 
                    class="close-button" 
                    src="/src/content/{theme}Theme/x_circle_icon.svg" 
                    alt="close error alert button" 
                    on:click={() => {errorStore.removeError(err.errorId)}}
                    on:keydown={() => {errorStore.removeError(err.errorId)}}
                />
            </div>
        {/each}
    </div>
</div>

<style>
    .bar {
        position: relative;
        padding: 1rem;
        background: rgb(131,58,180);
        background: linear-gradient(315deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%);
        font-size: 2rem;
    }
    .errors {
        position: absolute;
        display: flex;
        flex-direction: column-reverse;
        gap: 1rem;
        right: 1rem;
        bottom: 3rem;
        width: 30rem;
    }
    .element {
        display: flex;
        width: 100%;
        height: 2.5rem;
        background-color: rgba(214, 27, 27, 0.8);
        font-size: 1.2rem;
        padding: 0.5rem;
        box-sizing: border-box;
        overflow: hidden;
        color: var(--text-primary);
    }
    .text {
        width: 80%;
        height: 100%;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    .code {
        display: flex;
        justify-content: center;
        width: 10%;
        height: 90%;
        border-left: 2px rgb(115, 0, 0) solid;
        border-right: 2px rgb(115, 0, 0) solid;
    }
    .close-button {
        display: flex;
        justify-content: center;
        width: 10%;
        height: 90%;
        cursor: pointer;
    }
</style>