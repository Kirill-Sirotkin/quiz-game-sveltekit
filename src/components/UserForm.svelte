<script lang="ts">
    import Avatar from "./Avatar.svelte";
	import AvatarPanel from "./AvatarPanel.svelte";

    let selectedAvatar = "default.png";
    let choosingAvatar = false;

    const handleAvatarInteract = (event: { detail: { avatar: any; }; }) => {
        selectedAvatar = event.detail.avatar;
        choosingAvatar = false;
    }
</script>

{#if !choosingAvatar}
    <div class="avatar-wrapper">
        <Avatar 
            settings_button={true} 
            avatar_image={selectedAvatar} 
            on:settings={() => {choosingAvatar = true;}}
            --frame-color = "var(--text-primary)"
        />
    </div>
{:else}
    <AvatarPanel on:interact={handleAvatarInteract} />
{/if}

<style>
    .avatar-wrapper {
        width: 8rem;
        height: 8rem;
    }
</style>