<!-- src/routes/dashboard/+page.svelte -->
<script>
    import Repo from '$lib/components/Repo.svelte';
    import Ring from '$lib/components/Ring.svelte';
    import { onMount } from 'svelte';
    import DailyActivityWheel from '$lib/components/DailyActivityWheel.svelte';
    
    let repositories = [];
    let userName = "User"; // Replace this with actual user name fetching logic
    let rings = [
        { startColor: "#256EFF", endColor: "#99BBFF", progress: 75 },
        { startColor: "#F61067", endColor: "#FB89B5", progress: 50 },
        { startColor: "#3DDC97", endColor: "#4FDFA0", progress: 25 }
    ];

    function getEncouragingPhrase(rings) {
        const averageProgress = rings.reduce((sum, ring) => sum + ring.progress, 0) / rings.length;
        if (averageProgress >= 80) return "Fantastic work! You're crushing it!";
        if (averageProgress >= 60) return "Great progress! Keep up the momentum!";
        if (averageProgress >= 40) return "You're making steady progress. Keep pushing!";
        if (averageProgress >= 20) return "Good start! Let's aim higher!";
        return "Every step counts. You've got this!";
    }

    onMount(async () => {
        const response = await fetch('/api/github/repositories');
        if (response.ok) {
            repositories = await response.json();
        }
        // Add logic here to fetch user name if needed
    });
</script>

<div class="dashboard-header">
    <div class="greeting-section">
        <h1>Welcome, {userName}!</h1>
        <p class="encouraging-phrase">{getEncouragingPhrase(rings)}</p>
    </div>
    <div class="rings-section">
        <DailyActivityWheel />
    </div>
</div>

<h2>Your GitHub Repositories</h2>

<div class="repo-grid">
    {#each repositories as repo}
        <Repo 
            title={repo.name} 
            description={repo.description} 
            commits={repo.commits_count} 
            size={repo.size} 
        />
    {/each}
</div>

<style>
    .dashboard-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
        padding: 1rem;
        background-color: #f0f0f0;
        border-radius: 10px;
    }

    .greeting-section {
        flex: 1;
    }

    .rings-section {
        flex: 0 0 auto;
    }

    h1 {
        margin: 0 0 0.5rem 0;
        font-size: 2rem;
    }

    .encouraging-phrase {
        font-size: 1.2rem;
        color: #444;
    }

    .daily-activity {
        margin-bottom: 2rem;
    }

    h2 {
        margin-bottom: 1rem;
    }

    .repo-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
        gap: 20px;
        padding: 0px;
    }
</style>