<script lang="ts">
    
</script>

<div class="card">
    <div class="loader">

    </div>
</div>

<style>
    .card {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgb(65, 59, 59);
        border-radius: 0.5rem;
        width: 12rem;
        height: 12rem;
    }
    .loader {
        border: 16px solid #f3f3f3;
        border-top: 16px solid rgb(141, 141, 141);
        border-radius: 50%;
        width: 60%;
        height: 60%;
        animation: spin 1s linear infinite;
        box-shadow: 0 0 10px black;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>