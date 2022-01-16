import { defineNuxtConfig } from '@nuxt/bridge'
import { join } from 'path'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  ssr: false,
  target: 'static',
  bridge: false,
  css: ['~/assets/css/main.css'],
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },
  vite: {
    define: {
      'process.env': process.env,
    },
    optimizeDeps: {
      //exclude: ['web3']
    }
   },
   buildModules: [
     '@nuxt/postcss8'
   ],
})