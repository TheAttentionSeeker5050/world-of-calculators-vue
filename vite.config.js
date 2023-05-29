import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), 
    vueJsx()
  ],
  server: 80,
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly'
    },
    // preprocessorOptions: {
    //   scss: {
    //     additionalData: `@import './src/styles/custom.scss';`
    //   }
    // }
  }
})
