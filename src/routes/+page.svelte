<script lang="ts">
  export let data: { connection: boolean};
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
  
</main>