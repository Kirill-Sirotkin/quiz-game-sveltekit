<script lang="ts">
    import Button from "./Button.svelte";
</script>

<form on:submit|preventDefault={()=> alert("BOOM!")} class="form-wrapper">
    <div>Enter your nickname:</div>
    <input name="userName" autocomplete="off" />
    <Button on:click={()=> console.log("hello!")} button_text="START!"></Button>
</form>

<style>
    .form-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        font-size: 2rem;
        color: azure;
        padding: 2rem;
        border-radius: 0.5rem;
        background: linear-gradient(180deg, rgba(24, 0, 56, 1) 0%, rgba(34,0,81, 1) 50%, rgba(24,0,56, 1) 100%);
        box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.75);
    }
</style>