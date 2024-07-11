<script>
    export let size = 200;
    export let strokeWidth = 10;
    export let backgroundColor = "#e0e0e0";
    export let layers = [
      { color: "#ff0000", progress: 75 },
      { color: "#00ff00", progress: 50 },
      { color: "#0000ff", progress: 25 }
    ];
  
    $: radius = size / 2;
    $: normalizedRadius = radius - strokeWidth / 2;
    $: circumference = normalizedRadius * 2 * Math.PI;
  
    function calculateOffset(progress) {
      return circumference - (progress / 100) * circumference;
    }
  </script>
  
  <div class="activity-wheel" style="width: {size}px; height: {size}px;">
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
    >
      <!-- Background circle -->
      <circle
        stroke={backgroundColor}
        fill="transparent"
        stroke-width={strokeWidth}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      
      <!-- Progress layers -->
      {#each layers as layer, i}
        <circle
          stroke={layer.color}
          fill="transparent"
          stroke-width={strokeWidth}
          stroke-dasharray={circumference + ' ' + circumference}
          style="stroke-dashoffset: {calculateOffset(layer.progress)}; transform: rotate(-90deg); transform-origin: 50% 50%;"
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
  
    circle {
      transition: stroke-dashoffset 0.35s;
      transform: rotate(-90deg);
      transform-origin: 50% 50%;
    }
  </style>