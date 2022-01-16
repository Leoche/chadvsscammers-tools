const client_manifest = {
  "node_modules/nuxt3/dist/app/entry.mjs": {
    "file": "entry-3e37597f.mjs",
    "src": "node_modules/nuxt3/dist/app/entry.mjs",
    "isEntry": true,
    "dynamicImports": [
      "_bootstrap-005fd7f8.mjs"
    ]
  },
  "_bootstrap-005fd7f8.mjs": {
    "file": "bootstrap-005fd7f8.mjs",
    "isDynamicEntry": true,
    "dynamicImports": [
      "pages/index.vue"
    ],
    "css": [
      "assets/bootstrap.18758e1c.css"
    ],
    "assets": [
      "assets/bg.77ff15c3.jpg"
    ]
  },
  "pages/index.vue": {
    "file": "index-58110381.mjs",
    "src": "pages/index.vue",
    "isDynamicEntry": true,
    "imports": [
      "_bootstrap-005fd7f8.mjs"
    ]
  }
};

export { client_manifest as default };
