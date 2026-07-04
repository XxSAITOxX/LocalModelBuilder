FROM node:22

WORKDIR /app

COPY . .

RUN if [ -f package.json ]; then npm install; else echo "package.json not found; skipping npm install"; fi

EXPOSE 5173

CMD ["sh", "/app/init-frontend.sh"]
