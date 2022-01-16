import { defineNuxtConfig } from 'nuxt3'
import Buffer from 'buffer'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
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