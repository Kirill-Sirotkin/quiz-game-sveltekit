<script lang="ts">
    import Avatar from "./Avatar.svelte";

    export let user: {id:string, name:string, avatarPath:string, isHost:boolean, userColor:string};
</script>

<div class="player-card">
    <div class="avatar-wrapper">
        <Avatar
            settings_button={false} 
            avatar_image={user.avatarPath}
            --frame-color ={user.userColor}
        ></Avatar>
    </div>
    <div class="name-wrapper">
        {user.name}
    </div>
    <div class="score-wrapper">
        score:
        <div>
            0
        </div>
    </div>
    {#if user.isHost}
        <div class="host-icon">
            👑
        </div>
    {/if}
</div>

<style>
    .player-card {
        display: flex;
        align-items: center;
        position: relative;
        gap: 0.5rem;
        background-color: rgb(98, 98, 155);
        border-radius: 0.5rem;
        border: 4px solid;
        border-style: outset;
        border-color: rgb(42, 29, 77);
        padding: 0.5rem;
        box-sizing: border-box;
    }
    .avatar-wrapper {
        width: 4rem;
        height: 4rem;
    }
    .name-wrapper {
        overflow: hidden;
        font-size: 1.5rem;
        width: 10rem;
    }
    .score-wrapper {
        display: flex;
        flex-direction: column;
        gap: 0.3rem;
        align-items: end;
        font-size: 1.5rem;
    }
    .host-icon {
        position: absolute;
        font-size: 2rem;
        bottom: 3.5rem;
        left: 1.2rem;
    }
</style>