import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root = fileURLToPath(new URL('../', import.meta.url));
const types = {'.html':'text/html','.js':'text/javascript','.mjs':'text/javascript','.css':'text/css','.png':'image/png','.pdf':'application/pdf','.mp4':'video/mp4','.svg':'image/svg+xml','.json':'application/json'};
http.createServer(async (req,res) => {
  try {
    let url = decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    // Also serve under a project prefix so tests detect domain-root assumptions.
    url = url.replace(/^\/santiagoperezlosanovscky(?=\/)/,'');
    if (url.endsWith('/')) url += 'index.html';
    const target = path.resolve(root, '.' + url);
    if (!target.startsWith(root)) throw new Error('Invalid path');
    const body = await readFile(target);
    res.writeHead(200,{'Content-Type':types[path.extname(target)] || 'application/octet-stream'}); res.end(body);
  } catch { res.writeHead(404); res.end('Not found'); }
}).listen(4173,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:4173/'));
