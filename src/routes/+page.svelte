<script lang="ts">
  import { onMount } from 'svelte';
  import type { Item } from '$lib/front/type';
  export let data: { connection: boolean}; // Received from load function - Get database connection status
  let items : Item[] = [];

// GET items via fetch
const loadItems = async () => {
  const res = await fetch('/api/items');
  items = await res.json() as Item[];
};
onMount(async () => {
  await loadItems();
  console.info("Page mounted, items loaded:", items);
});
</script>



<main class="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
  <h1 class="text-4xl font-bold mb-6">Welcome to MateriaList</h1>
  <p class="text-lg text-gray-700 mb-4">
    Manage your collection of Materia with ease.
  </p>

  <div class="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
    <h2 class="text-2xl font-semibold mb-4">Database Connection Info</h2>
    {#if data.connection}
      <p class="text-green-600 mb-2">Successfully connected to the database!</p>
    {:else}
      <p class="text-red-600 mb-2">Failed to connect to the database.</p>
    {/if}
  </div>

  <div class="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl mt-6">
    <h2 class="text-2xl font-semibold mb-4">Items</h2>
    {#if items.length > 0}
      <ul class="list-disc list-inside">
        {#each items as item}
          <li>{item.name}</li>
        {/each}
      </ul>
    {:else}
      <p class="text-gray-500">No items found.</p>
    {/if}
  </div>


  
</main>