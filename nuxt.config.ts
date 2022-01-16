import { defineNuxtConfig } from 'nuxt3'
import Buffer from 'buffer'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  dev: true,
  ssr: false,
  css: ['~/assets/css/main.css'],
  build: {
    postcss: {
      postcssOptions: require('./postcss.config.js'),
    },
  },
  vite: {
    define: {
      'process.env': process.env,
    },
    optimizeDeps: {
      exclude: ['web3']
    }
   },
})