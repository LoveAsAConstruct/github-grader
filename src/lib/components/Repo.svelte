<script>
    export let title = "None";
    export let description = "No description";
    export let commits = 0;
    export let size = 0;

    // Convert size to KB or MB
    $: sizeFormatted = size < 1024 ? `${size} KB` : `${(size / 1024).toFixed(2)} MB`;
</script>

<div class="repo-container">
    <h2 class="title">{title}</h2>
    <p class="description">{description}</p>
    <div class="stats">
        <span class="commits">Commits: {commits}</span>
        <span class="size">Size: {sizeFormatted}</span>
    </div>
</div>

<style>
    .repo-container {
        border-radius: 15px;
        background-color: #9FB8AD;
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        
        transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    }

    .repo-container:hover {
        transform: translateY(-5px);
        box-shadow: rgba(149, 157, 165, 0.3) 0px 12px 28px;
    }

    .title {
        font-weight: bold;
        font-size: 1.2em;
        margin: 0 0 10px 0;
        color: #3F403F;
    }

    .description {
        font-size: 0.9em;
        color: #475841;
        margin-bottom: 15px;
        flex-grow: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }

    .stats {
        display: flex;
        justify-content: space-between;
        font-size: 0.8em;
        color: #9FB8AD;
    }

    .commits, .size {
        background-color: #475841;
        padding: 5px 10px;
        border-radius: 10px;
    }
</style>