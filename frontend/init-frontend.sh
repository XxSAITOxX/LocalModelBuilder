#!/bin/sh
set -eu

if [ ! -f package.json ]; then
  echo "frontend/package.json not found; creating Vite React TypeScript app"
  rm -rf /tmp/vite-frontend
  cd /tmp
  npm create vite@latest vite-frontend -- --template react-ts
  cd /app
  cp -a /tmp/vite-frontend/. /app/
fi

if [ ! -d node_modules ]; then
  npm install
fi

npm ls @xyflow/react @mui/material @emotion/react @emotion/styled @mui/icons-material axios >/dev/null 2>&1 || \
  npm install @xyflow/react @mui/material @emotion/react @emotion/styled @mui/icons-material axios

chown -R "${LOCAL_UID:-1000}:${LOCAL_GID:-1000}" /app

tail -f /dev/null
