import adapter from "@sveltejs/adapter-vercel";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    alias: {
      $lib: "src/lib",
      $server: "src/lib/server",
      $database: "src/database",
    },
  },
  preprocess: vitePreprocess(),
};

export default config;
