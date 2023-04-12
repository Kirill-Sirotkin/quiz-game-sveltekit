<script lang="ts">
    export let form_text = "Enter:"
    export let input_text:string = "";
    export let is_disabled = false;
</script>

<div class="form-wrapper">
    <div class="form-text">
        {form_text}
    </div>
    <input type="text" disabled={is_disabled} bind:value={input_text} class="form-input" />
</div>

<style>
    .form-wrapper {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
    .form-text {
        color: beige;
        padding-left: 0.1rem;
        font-size: 1.2rem;
    }
    .form-input {
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        width: 15rem;
        border-radius: 0.25rem;
        font-size: 1.5rem;
        padding: 0.5rem 0.5rem;
        color: beige;
        background-color: rgba(0, 0, 0, 0.2);
    }
</style>