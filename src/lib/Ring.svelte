<script>
    export let progress = 0; // Progress as a percentage
  </script>
  
  <svg viewBox="0 0 36 36" class="circular-chart">
    <path class="circle-bg"
      d="M18 2.0845
         a 15.9155 15.9155 0 0 1 0 31.831
         a 15.9155 15.9155 0 0 1 0 -31.831"
    />
    <path class="circle"
      stroke-dasharray="{progress}, 100"
      d="M18 2.0845
         a 15.9155 15.9155 0 0 1 0 31.831
         a 15.9155 15.9155 0 0 1 0 -31.831"
    />
  </svg>
  
  <style>
    .circular-chart {
      display: block;
      margin: 10px auto;
      max-width: 80%;
      max-height: 250px;
    }
    .circle-bg {
      fill: none;
      stroke: #eee;
      stroke-width: 3.8;
    }
    .circle {
      fill: none;
      stroke-width: 2.8;
      stroke-linecap: round;
      animation: progress 1s ease-out forwards;
    }
  </style>
  