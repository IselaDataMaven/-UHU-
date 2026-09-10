#!/usr/bin/env node
/**
 * ÑUHU Resonance — static server (zero dependencies)
 * Usage: node server.js   or   npm run dev
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = Number(process.env.PORT) || 3000;
const ROOT = __dirname;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.ogg': 'audio/ogg',
  '.glb': 'model/gltf-binary',
  '.gltf': 'model/gltf+json',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.map': 'application/json',
};

const server = http.createServer((req, res) => {
  try {
    let urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
    if (urlPath === '/') urlPath = '/index.html';
    // Prevent path traversal
    const filePath = path.normalize(path.join(ROOT, urlPath));
    if (!filePath.startsWith(ROOT)) {
      res.writeHead(403); res.end('Forbidden'); return;
    }
    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 — No encontrado: ' + urlPath); return;
    }
    const ext = path.extname(filePath).toLowerCase();
    const type = MIME[ext] || 'application/octet-stream';
    res.writeHead(200, {
      'Content-Type': type,
      'Cache-Control': 'no-cache',
      // Allow camera/mic on localhost
      'Permissions-Policy': 'camera=(self), microphone=(self), geolocation=()',
    });
    fs.createReadStream(filePath).pipe(res);
  } catch (e) {
    res.writeHead(500); res.end(String(e));
  }
});

server.listen(PORT, '127.0.0.1', () => {
  console.log('');
  console.log('  ╔══════════════════════════════════════════╗');
  console.log('  ║   ÑUHU RESONANCE — servidor listo        ║');
  console.log('  ╚══════════════════════════════════════════╝');
  console.log('');
  console.log('  Hub:      http://localhost:' + PORT + '/');
  console.log('  Aventura: http://localhost:' + PORT + '/nuhu-aventura-vr.html');
  console.log('  Unified:  http://localhost:' + PORT + '/nuhu-resonance-unified.html');
  console.log('');
  console.log('  Cámara y micrófono: OK en localhost');
  console.log('  Ctrl+C para detener');
  console.log('');
});
