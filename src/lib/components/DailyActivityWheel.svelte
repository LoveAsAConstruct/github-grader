<!-- DailyActivityWheel.svelte -->
<script>
  import { onMount } from 'svelte';
  import ActivityWheel from '$lib/components/Ring.svelte';

  let dailyActivity = { commits: 0, linesOfCode: 0, fileSize: 0 };
  let loading = true;
  let error = null;

  onMount(async () => {
    try {
      const response = await fetch('/api/github/daily-activity');
      if (response.ok) {
        dailyActivity = await response.json();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch daily activity');
      }
    } catch (err) {
      console.error('Error:', err);
      error = err.message;
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
{:else if error}
  <p>Error: {error}</p>
{:else}
  <div class="daily-activity">
    <ActivityWheel
      size={250}
      strokeWidth={20}
      backgroundColor="#f0f0f0"
      showBackground={true}
      layers={[
        { startColor: "#256EFF", endColor: "#8E3FB3", progress: commitProgress },
        { startColor: "#F61067", endColor: "#9A767F", progress: linesProgress },
        { startColor: "#3DDC97", endColor: "#4FDFA0", progress: fileSizeProgress }
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

  .stats {
    margin-top: 20px;
    text-align: left;
  }

  .stats p {
    margin: 10px 0;
    font-size: 16px;
    font-weight: 500;
  }
</style>