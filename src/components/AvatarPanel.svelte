<script lang="ts">
	import { createEventDispatcher } from "svelte";
    import { avatarList } from "../stores/avatar_store";
    import Avatar from "./Avatar.svelte";
    
	const dispatch = createEventDispatcher();
    
    const handleModal = () => {
        dispatch('modal', {});
    }
</script>

<div class="modal" on:click|stopPropagation = {handleModal} on:keydown={handleModal}>
    <div class="panel-wrapper" on:click|stopPropagation on:keydown|stopPropagation>
        {#each $avatarList as avatar}
            <div class="element">
                <Avatar 
                    settingsButton={false} 
                    interactable={true}
                    avatarImage={avatar} 
                    on:interact 
                    --frame-color = "var(--text-primary)"
                ></Avatar>
            </div>
        {/each}
    </div>
</div>

<style>
    * {
        margin: 0;
        padding: 0;
    }
    .modal {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background-color: rgba(100, 100, 100, 0.1);
    }
    .panel-wrapper {
        display: grid;
        gap: 1rem;
        padding: 1rem;
        grid-template-columns: repeat(4, 1fr);
        background-color: rgba(108, 108, 108, 0.5);
        border-radius: 1rem;
        border: 2px solid var(--text-primary);
        max-width: fit-content;
        max-height: fit-content;
    }
    .element {
        height: 6rem;
        width: 6rem;
    }
</style>