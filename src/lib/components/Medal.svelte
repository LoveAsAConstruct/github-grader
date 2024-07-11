<script>
    export let title;
    export let description;
    export let color;
  </script>
  
  <div class="medal" style="background-color: {color}">
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
  
  <style>
    .medal {
      border-radius: 50%;
      width: 100px;
      height: 100px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: white;
      text-align: center;
      padding: 10px;
      margin: 10px;
    }
  </style>
  