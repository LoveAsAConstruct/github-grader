<!-- Ring.svelte -->
<script>
  export let size = 250;
  export let strokeWidth = 20;
  export let backgroundColor = "#f0f0f0";
  export let showBackground = true;
  export let layers = [
    { startColor: "#256EFF", endColor: "#99BBFF", progress: 75 },
    { startColor: "#F61067", endColor: "#FB89B5", progress: 50 },
    { startColor: "#3DDC97", endColor: "#4FDFA0", progress: 25 }
  ];

  $: radius = size / 2;
  $: normalizedRadius = radius - strokeWidth / 2;
  $: circumference = normalizedRadius * 2 * Math.PI;

  function calculateOffset(progress) {
    return circumference - (progress / 100) * circumference;
  }

  let mounted = false;

  import { onMount } from 'svelte';
  onMount(() => {
    mounted = true;
  });
</script>

<div class="activity-wheel" style="width: {size}px; height: {size}px;">
  <svg
    width={size}
    height={size}
    viewBox={`0 0 ${size} ${size}`}
  >
    <defs>
      {#each layers as layer, i}
        <linearGradient id="gradient-{i}" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color={layer.startColor} />
          <stop offset="100%" stop-color={layer.endColor} />
        </linearGradient>
      {/each}
    </defs>
    
    {#each layers as layer, i}
      {#if showBackground}
        <circle
          stroke={backgroundColor}
          fill="transparent"
          stroke-width={strokeWidth}
          r={normalizedRadius - (i * (strokeWidth + 2))}
          cx={radius}
          cy={radius}
        />
      {/if}
      
      <circle
        class="progress-ring"
        stroke="url(#gradient-{i})"
        fill="transparent"
        stroke-width={strokeWidth}
        stroke-linecap="round"
        stroke-dasharray={circumference + ' ' + circumference}
        style="stroke-dashoffset: {mounted ? calculateOffset(layer.progress) : circumference}; transform: rotate(-90deg); transform-origin: 50% 50%;"
        r={normalizedRadius - (i * (strokeWidth + 2))}
        cx={radius}
        cy={radius}
      />
    {/each}
  </svg>
</div>

<style>
  .activity-wheel {
    position: relative;
  }

  .progress-ring {
    transition: stroke-dashoffset 1s ease-in-out;
    filter: drop-shadow(0px 0px 3px rgba(0, 0, 0, 0.2));
  }
</style>