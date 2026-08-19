from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.routers.user import router as user_router
from backend.routers.ai import router as ai_router


# =====================================================
# APPLICATION
# =====================================================

app = FastAPI(
    title="Jigyasa API",
    description="AI-Powered Learning Assistant",
    version="1.0.0",
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

app.include_router(ai_router)


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
