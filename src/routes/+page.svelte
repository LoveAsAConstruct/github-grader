<script context="module">
    export async function load({ fetch, cookies }) {
      const token = cookies.get('github_token');
      console.log('Token from cookies:', token);
      let repos = [];
      let error = '';
  
      if (token) {
        const username = 'your_github_username';
        try {
          const response = await fetch(`/api/repos?username=${username}`);
          console.log('Response status:', response.status);
          if (!response.ok) {
            error = 'Failed to fetch data';
            const errorText = await response.text();
            console.error('Failed to fetch data:', errorText);
          } else {
            repos = await response.json();
            console.log('Fetched repos:', repos);
          }
        } catch (err) {
          error = 'An error occurred while fetching data';
          console.error('Error:', err);
        }
      } else {
        console.log('No token found');
      }
  
      return { props: { repos, token, error } };
    }
  </script>
  
  <script>
    import Ring from '$lib/Ring.svelte';
    import Medal from '$lib/Medal.svelte';
  
    export let repos = [];
    export let token = '';
    export let error = '';
  
    const calculateProgress = (repo) => {
      const maxCommits = 1000; // Example maximum for ring calculation
      return (repo.commits_count / maxCommits) * 100;
    };
  
    const calculateMedals = (repo) => {
      const medals = [];
      if (repo.stars_count > 100) {
        medals.push({ title: 'Star Master', description: '100+ Stars', color: 'gold' });
      }
      if (repo.forks_count > 50) {
        medals.push({ title: 'Fork Expert', description: '50+ Forks', color: 'silver' });
      }
      return medals;
    };
  
    console.log('Repos:', repos);
  </script>
  
  <main>
    <h1>GitHub Project Grader</h1>
    {#if token}
      <p>Token found. Loading data...</p>
      {#if error}
        <p>{error}</p>
      {:else if repos.length === 0}
        <p>No repositories found or none qualify for medals.</p>
      {:else}
        {#each repos as repo}
          <div>
            <h2>{repo.name}</h2>
            <Ring progress={calculateProgress(repo)} />
            <div>
              {#each calculateMedals(repo) as medal}
                <Medal title={medal.title} description={medal.description} color={medal.color} />
              {/each}
            </div>
          </div>
        {/each}
      {/if}
      <button on:click={() => document.cookie = 'github_token=; Max-Age=0; Path=/'}>Logout</button>
    {:else}
      <a href="/api/auth/login">Login with GitHub</a>
    {/if}
  </main>
  