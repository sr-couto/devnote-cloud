import { fileURLToPath, URL } from "node:url"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import tailwind from "tailwindcss"
import autoprefixer from "autoprefixer"
import { VitePWA } from "vite-plugin-pwa"
import vueDevTools from "vite-plugin-vue-devtools"

export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  plugins: [
    vue(),
    VitePWA({
      registerType: "prompt",
      manifest: {
        name: "DevNote",
        short_name: "DevNote",
        description: "DevNote",
        theme_color: "#020817",
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 10000000,
      },
    }),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  // server: {
  //   port: 4173,
  // },
  build: {
    chunkSizeWarningLimit: 2000,
  },
})
