import {fileURLToPath, URL} from 'node:url'
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue(),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 3000,
    host: '0.0.0.0'
  },
  css: {
    // loaderOptions: {
    //     sass: {
    // //         prependData: `
    // //             @import "./src/assets/scss/variables.scss";
    // //         `,
    //         api: 'modern-compiler'
    //     }
    // },
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/scss/variables.scss" as *; @use "@/assets/scss/mixins.scss" as *;`,
      }
    }
  }
})
