from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.database import create_tables
from backend.routers.user import router as user_router


@asynccontextmanager
async def lifespan(_: FastAPI):
    create_tables()
    yield


app = FastAPI(
    title="Jigyasa API",
    description="AI-Powered Learning Assistant",
    version="1.0.0",
    lifespan=lifespan,
)


# =====================================================
# CORS
# =====================================================

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


# =====================================================
# ROUTERS
# =====================================================

app.include_router(user_router)


# =====================================================
# ROOT
# =====================================================

@app.get("/")
def home():
    return {
        "message": "Welcome to Jigyasa API",
        "status": "running",
    }


# =====================================================
# HEALTH
# =====================================================

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "message": "Jigyasa backend is working",
    }
