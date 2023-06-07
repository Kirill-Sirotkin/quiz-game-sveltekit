<script lang="ts">
    import { avatarList } from "../stores/avatar_store";
    import Avatar from "./Avatar.svelte";
</script>

<div class="panel-wrapper">
    {#each $avatarList as avatar}
        <div class="element">
            <Avatar 
                settings_button={false} 
                interactable={true}
                avatar_image={avatar} 
                on:interact 
                --frame-color = "var(--text-primary)"
            ></Avatar>
        </div>
    {/each}
</div>

<style>
    * {
        margin: 0;
        padding: 0;
    }
    .panel-wrapper {
        display: grid;
        gap: 1rem;
        padding: 1rem;
        grid-template-columns: repeat(4, 1fr);
        background-color: rgba(108, 108, 108, 0.5);
        border-radius: 1rem;
        border: 2px solid var(--text-primary);
    }
    .element {
        height: 6rem;
        width: 6rem;
    }
</style>