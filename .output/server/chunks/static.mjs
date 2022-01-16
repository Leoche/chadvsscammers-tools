import { createError } from 'h3';
import { withLeadingSlash, withoutTrailingSlash, parseURL } from 'ufo';
import { promises } from 'fs';
import { resolve, dirname } from 'pathe';
import { fileURLToPath } from 'url';

const assets = {
  "/_nuxt/bootstrap-005fd7f8.mjs": {
    "type": "application/javascript",
    "etag": "\"1a3cd-3jAYWjurkM4aMT6onePeSEOorZ0\"",
    "mtime": "2022-01-16T15:02:26.289Z",
    "path": "../public/_nuxt/bootstrap-005fd7f8.mjs"
  },
  "/_nuxt/entry-3e37597f.mjs": {
    "type": "application/javascript",
    "etag": "\"65-yZWcYSmMfa4BNye9JJVk0feciwA\"",
    "mtime": "2022-01-16T15:02:26.289Z",
    "path": "../public/_nuxt/entry-3e37597f.mjs"
  },
  "/_nuxt/index-58110381.mjs": {
    "type": "application/javascript",
    "etag": "\"b4-TKfkbdyJhyu0UvME/fuXOs/TNkg\"",
    "mtime": "2022-01-16T15:02:26.289Z",
    "path": "../public/_nuxt/index-58110381.mjs"
  },
  "/_nuxt/manifest.json": {
    "type": "application/json",
    "etag": "\"298-kbBYFqgGuF3OjrszDNRIy8WkjF0\"",
    "mtime": "2022-01-16T15:02:26.289Z",
    "path": "../public/_nuxt/manifest.json"
  },
  "/_nuxt/assets/bg.77ff15c3.jpg": {
    "type": "image/jpeg",
    "etag": "\"a447c-lLk01AnU1nHAXHjnr2j2TdkOKRQ\"",
    "mtime": "2022-01-16T15:02:26.289Z",
    "path": "../public/_nuxt/assets/bg.77ff15c3.jpg"
  },
  "/_nuxt/assets/bootstrap.18758e1c.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"156a-Z8v5z74MlqQ9wKJgSNhnLj+vQLA\"",
    "mtime": "2022-01-16T15:02:26.289Z",
    "path": "../public/_nuxt/assets/bootstrap.18758e1c.css"
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
const STATIC_ASSETS_BASE = "C:/wamp64/www/chadvsscammers-tools/dist" + "/" + "1642345343";
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
