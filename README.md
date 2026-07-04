# LocalModelBuilder
Build PyTorch models visually with node-based architecture.

## Docker environment

### First setup

```sh
docker compose up -d --build
```

The backend container stays running without starting `uvicorn`, so it can be used before `backend/app/main.py` exists.

The frontend container creates a Vite React TypeScript app automatically when `frontend/package.json` is missing, then installs:

```sh
@xyflow/react
@mui/material
@emotion/react
@emotion/styled
@mui/icons-material
axios
```

### Start containers

After the first setup, start the existing containers:

```sh
docker compose up -d
```

Check container status:

```sh
docker compose ps
```

### Start applications

Start the backend application:

```sh
docker compose exec backend uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

Start the frontend application:

```sh
docker compose exec frontend npm run dev -- --host 0.0.0.0
```

Application URLs:

```txt
Backend:  http://localhost:8000
Frontend: http://localhost:5173
```

Backend check endpoints:

```txt
http://localhost:8000/health
http://localhost:8000/api/system
```

### Useful commands

Show logs:

```sh
docker compose logs -f
```

Stop containers:

```sh
docker compose stop
```

Stop and remove containers:

```sh
docker compose down
```
