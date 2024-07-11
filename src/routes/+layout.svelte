<script>
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
  
    let user = null;
  
    onMount(async () => {
      // Check if user is authenticated
      const response = await fetch('/api/auth/user');
      if (response.ok) {
        user = await response.json();
      }
    });
  
    async function signOut() {
        const response = await fetch('/api/auth/signout', { method: 'POST' });
        if (response.ok) {
            user = null;
            goto('/');
        }
    }
  </script>

<nav>
    <a href="/">Home</a>
    {#if user}
        <a href="/dashboard">Dashboard</a>
        <button on:click={signOut}>Sign Out</button>
    {:else}
        <a href="/api/auth/github">Sign In with GitHub</a>
    {/if}
</nav>

<main>
    <slot />
</main>

<style>
    nav {
        background-color: #14110F;
        color: #F3F3F4;
        padding: 10px;
    }
    nav a {
        text-decoration: none;
        color: #F3F3F4;
        font-size: large;
    }
    nav button {
        background-color: transparent;
        border: none;
        color: #F3F3F4;
        font-size: large;
    }
    main {
        padding: 20px;
    }
</style>