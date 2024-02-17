import { defineConfig } from 'astro/config';
import svelte from "@astrojs/svelte";
import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  integrations: [svelte()],
  prefetch: true,
  output: "server",
  adapter: netlify(),
  site: import.meta.env.SITE_URL
});