<script lang="ts">
    import { avatarList } from "../stores/avatar_store";
    import Avatar from "./Avatar.svelte";
</script>

<div class="wrapper">
    {#each $avatarList as avatar}
        <div class="element">
            <Avatar 
                settings_button={false} 
                interactable={true}
                avatar_image={avatar} 
                on:interact 
                --frame-color = "rgb(0, 27, 66)"
            ></Avatar>
        </div>
    {/each}
</div>

<style>
    * {
        margin: 0;
        padding: 0;
    }
    .wrapper {
        display: grid;
        gap: 1rem;
        padding: 1rem;
        grid-template-columns: repeat(4, 1fr);
        background-color: rgba(108, 108, 108, 0.5);
        border-radius: 1rem;
        border: 2px solid;
        border-color: rgb(0, 27, 66);
    }
    .element {
        height: 6rem;
        width: 6rem;
    }
</style>