<script lang="ts">
    export let button_text = "text";
</script>

<button on:click>
    {button_text}
</button>

<style>
    button {
        background-color: #2e006f;
        border-radius: 0.5rem;
        color: azure;
        padding: 1rem 3rem;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 2rem;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }
</style>