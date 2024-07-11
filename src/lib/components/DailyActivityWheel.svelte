<!-- src/lib/components/DailyActivityWheel.svelte -->
<script>
    import { onMount } from 'svelte';
    import ActivityWheel from '$lib/components/Ring.svelte';
  
    let dailyActivity = { commits: 0, linesOfCode: 0, fileSize: 0 };
    let loading = true;
  
    onMount(async () => {
      try {
        const response = await fetch('/api/github/daily-activity');
        if (response.ok) {
          dailyActivity = await response.json();
        } else {
          console.error('Failed to fetch daily activity');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        loading = false;
      }
    });
  
    $: commitProgress = Math.min((dailyActivity.commits / 10) * 100, 100);
    $: linesProgress = Math.min((dailyActivity.linesOfCode / 1000) * 100, 100);
    $: fileSizeProgress = Math.min((dailyActivity.fileSize / 10000) * 100, 100);
  </script>
  
  {#if loading}
    <p>Loading daily activity...</p>
  {:else}
    <div class="daily-activity">
      <ActivityWheel
        size={250}
        strokeWidth={12}
        backgroundColor="#f0f0f0"
        layers={[
          { color: "#ff6b6b", progress: commitProgress },
          { color: "#4ecdc4", progress: linesProgress },
          { color: "#45b7d1", progress: fileSizeProgress }
        ]}
      />
      <div class="stats">
        <p><span style="color: #ff6b6b;">●</span> Commits: {dailyActivity.commits}</p>
        <p><span style="color: #4ecdc4;">●</span> Lines of Code: {dailyActivity.linesOfCode}</p>
        <p><span style="color: #45b7d1;">●</span> File Size Changes: {dailyActivity.fileSize} bytes</p>
      </div>
    </div>
  {/if}
  
  <style>
    .daily-activity {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
      background-color: white;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
  
    .stats {
      margin-top: 20px;
      text-align: left;
    }
  
    .stats p {
      margin: 5px 0;
      font-size: 14px;
    }
  </style>