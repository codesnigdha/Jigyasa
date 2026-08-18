from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.routers.user import router as user_router


# =====================================================
# FastAPI Application
# =====================================================

app = FastAPI(
    title="Jigyasa API",
    description="AI-Powered Learning Assistant",
    version="1.0.0",
)


# =====================================================
# CORS Configuration
# =====================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =====================================================
# Register Routers
# =====================================================

app.include_router(user_router)


# =====================================================
# Root Endpoint
# =====================================================

@app.get("/")
def home():
    return {
        "message": "Welcome to Jigyasa API",
        "status": "running",
    }


# =====================================================
# Health Check
# =====================================================

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "message": "Jigyasa backend is working",
    }
