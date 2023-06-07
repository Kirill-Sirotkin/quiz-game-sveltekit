<script lang="ts">
    export let formText = "Enter:"
    export let formPlaceholder = "Example..."
    export let inputText:string = "";
    export let isDisabled = false;
</script>

<div class="form-wrapper">
    {#if formText}
        <div class="form-text">
            {formText}
        </div>
    {/if}
    <input class="form-input" type="text" disabled={isDisabled} bind:value={inputText} maxlength="15" placeholder={formPlaceholder} />
</div>

<style>
    .form-wrapper {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
    .form-text {
        color: var(--text-primary);
        padding-left: 0.1rem;
        font-size: 1.2rem;
    }
    .form-input {
        width: 15rem;
        border-radius: 0.25rem;
        font-size: 1.5rem;
        padding: 0.5rem 0.5rem;
        color: var(--text-primary);
        background-color: rgba(100, 100, 100, 0.5);
    }
</style>