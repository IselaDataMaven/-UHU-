#!/bin/bash
cd "$(dirname "$0")"
command -v node >/dev/null || { echo "Instala Node.js: https://nodejs.org"; exit 1; }
[ -d node_modules ] || npm install
echo "http://localhost:3000"
(command -v xdg-open >/dev/null && xdg-open "http://localhost:3000") || true
(command -v open >/dev/null && open "http://localhost:3000") || true
node server.js
