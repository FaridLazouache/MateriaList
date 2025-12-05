<script>
  import '../app.css'
  let { children } = $props()
</script>

{@render children?.()}

<title>MateriaList</title>
<meta name="description" content="MateriaList is a SvelteKit application to help you manage your collection of items with ease." />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<svelte:head>
  <title>MateriaList</title>
 <h1>
  <nav class="bg-gray-800 p-4 text-white flex justify-between">
    <a class="text-lg font-bold" href="/">MateriaList</a>
    <div>
      <a href="/swagger-ui" class="hover:underline">API Docs</a>
    </div>
  </nav>
</h1>
</svelte:head>

<footer class="text-center p-4 bg-gray-200">
  <p class="text-sm text-gray-600">© 2025 LeChatBear. All rights reserved.</p>
</footer>
