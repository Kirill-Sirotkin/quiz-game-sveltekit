<script lang="ts">
    
</script>

<div class="loader"></div>

<style>
    .loader {
        border: 16px solid #c5c5c5;
        border-top: 16px solid rgb(106, 106, 106);
        border-radius: 50%;
        width: 7rem;
        height: 7rem;
        animation: spin 1s linear infinite;
        box-shadow: 0 0 10px black;
    }
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>