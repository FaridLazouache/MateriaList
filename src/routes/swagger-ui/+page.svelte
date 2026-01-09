<script lang="ts">
 import { onMount } from 'svelte';
 import { SwaggerUIBundle } from 'swagger-ui-dist';
 import 'swagger-ui-dist/swagger-ui.css';

  onMount(() => {
    SwaggerUIBundle({
      url: "./swagger.json",
      dom_id: "#swagger-ui-container"
    });
  });
</script>

<div id="swagger-ui-container" class="min-h-screen"></div>