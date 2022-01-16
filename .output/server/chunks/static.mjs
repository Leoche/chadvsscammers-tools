import { createError } from 'h3';
import { withLeadingSlash, withoutTrailingSlash, parseURL } from 'ufo';
import { promises } from 'fs';
import { resolve, dirname } from 'pathe';
import { fileURLToPath } from 'url';

const assets = {
  "/_nuxt/bootstrap-5a3fc4cb.mjs": {
    "type": "application/javascript",
    "etag": "\"16f036-ZUxfmQWHP2vUmGpgTzL+c0SpPVI\"",
    "mtime": "2022-01-16T17:42:03.759Z",
    "path": "../public/_nuxt/bootstrap-5a3fc4cb.mjs"
  },
  "/_nuxt/entry-39517e99.mjs": {
    "type": "application/javascript",
    "etag": "\"47-ICOSoha4OH13x+v5gQr6hWMUx6E\"",
    "mtime": "2022-01-16T17:42:03.758Z",
    "path": "../public/_nuxt/entry-39517e99.mjs"
  },
  "/_nuxt/manifest.json": {
    "type": "application/json",
    "etag": "\"20e-a0K4W6RDfalidP5raTYSdWW/FHw\"",
    "mtime": "2022-01-16T17:42:03.758Z",
    "path": "../public/_nuxt/manifest.json"
  },
  "/_nuxt/assets/bg.8a0c1d48.jpg": {
    "type": "image/jpeg",
    "etag": "\"2e141-hfq6Gi5BbQ4fsE1fkMHrcJvYVE8\"",
    "mtime": "2022-01-16T17:42:03.758Z",
    "path": "../public/_nuxt/assets/bg.8a0c1d48.jpg"
  },
  "/_nuxt/assets/bootstrap.38381214.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"197c-9DGkxv+dAwAA+fR8xkE49GoprZU\"",
    "mtime": "2022-01-16T17:42:03.758Z",
    "path": "../public/_nuxt/assets/bootstrap.38381214.css"
  }
};

const mainDir = dirname(fileURLToPath(globalThis.entryURL));

function readAsset (id) {
  return promises.readFile(resolve(mainDir, getAsset(id).path))
}

function getAsset (id) {
  return assets[id]
}

const METHODS = ["HEAD", "GET"];
const PUBLIC_PATH = "/_nuxt/";
const TWO_DAYS = 2 * 60 * 60 * 24;
const STATIC_ASSETS_BASE = "C:/wamp64/www/chadvsscammers-tools/dist" + "/" + "1642354918";
async function serveStatic(req, res) {
  if (!METHODS.includes(req.method)) {
    return;
  }
  let id = withLeadingSlash(withoutTrailingSlash(parseURL(req.url).pathname));
  let asset = getAsset(id);
  if (!asset) {
    const _id = id + "/index.html";
    const _asset = getAsset(_id);
    if (_asset) {
      asset = _asset;
      id = _id;
    }
  }
  if (!asset) {
    if (id.startsWith(PUBLIC_PATH) && !id.startsWith(STATIC_ASSETS_BASE)) {
      throw createError({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = req.headers["if-none-match"] === asset.etag;
  if (ifNotMatch) {
    res.statusCode = 304;
    return res.end("Not Modified (etag)");
  }
  const ifModifiedSinceH = req.headers["if-modified-since"];
  if (ifModifiedSinceH && asset.mtime) {
    if (new Date(ifModifiedSinceH) >= new Date(asset.mtime)) {
      res.statusCode = 304;
      return res.end("Not Modified (mtime)");
    }
  }
  if (asset.type) {
    res.setHeader("Content-Type", asset.type);
  }
  if (asset.etag) {
    res.setHeader("ETag", asset.etag);
  }
  if (asset.mtime) {
    res.setHeader("Last-Modified", asset.mtime);
  }
  if (id.startsWith(PUBLIC_PATH)) {
    res.setHeader("Cache-Control", `max-age=${TWO_DAYS}, immutable`);
  }
  const contents = await readAsset(id);
  return res.end(contents);
}

export { serveStatic as default };
