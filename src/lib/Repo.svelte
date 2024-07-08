<script>
    export let title = "None";
</script>

<div class="repo-container">
    <h1 class = "title">{title}</h1>
</div>

<style>
    .repo-container {
        border-radius: 15px;
        background-color: #D9C5B2;
        padding: 15px;
        aspect-ratio: 1;
        scale: 1;
        transition: scale 5s ease-in-out;
    }
    .title {
        font-weight: bold;
        font-size: medium;
        margin: 0px;
    }
</style>