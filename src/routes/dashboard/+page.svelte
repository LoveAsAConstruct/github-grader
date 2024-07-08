<!-- src/routes/dashboard/+page.svelte -->
<script>
    import Repo from '$lib/Repo.svelte';
    import { onMount } from 'svelte';

    let repositories = [];

    onMount(async () => {
        const response = await fetch('/api/github/repositories');
        if (response.ok) {
        repositories = await response.json();
        }
    });
</script>

<h1>Your GitHub Repositories</h1>

<div class="repo-grid">
    {#each repositories as repo}
      <Repo title={repo.name} description={repo.description} />
    {/each}
  </div>
  
  <style>
    .repo-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 20px;
      padding: 0px;
    }
  
    h1 {
      margin-bottom: 20px;
    }
  </style>