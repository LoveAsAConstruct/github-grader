<script>
  export let size = 200;
  export let strokeWidth = 10;
  export let backgroundColor = "#e0e0e0";
  export let showBackground = true;
  export let layers = [
    { startColor: "#ff5e57", endColor: "#ff3131", progress: 75 },
    { startColor: "#5ee2ff", endColor: "#00b8ff", progress: 50 },
    { startColor: "#9eff5e", endColor: "#31ff31", progress: 25 }
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
    
    {#if showBackground}
      <circle
        stroke={backgroundColor}
        fill="transparent"
        stroke-width={strokeWidth}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
    {/if}
    
    {#each layers as layer, i}
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