from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import torch


app = FastAPI(
    title="LocalModelBuilder API",
    version="0.1.0",
    description="Backend API for building PyTorch models visually.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root() -> dict[str, str]:
    return {
        "name": "LocalModelBuilder API",
        "status": "running",
    }


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/api/system")
def get_system_info() -> dict[str, object]:
    cuda_available = torch.cuda.is_available()

    return {
        "torch_version": torch.__version__,
        "cuda_available": cuda_available,
        "cuda_device_count": torch.cuda.device_count() if cuda_available else 0,
        "cuda_device_name": torch.cuda.get_device_name(0) if cuda_available else None,
    }


@app.get("/api/models")
def list_models() -> dict[str, list[dict[str, str]]]:
    return {"models": []}
