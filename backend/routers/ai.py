import os
from pathlib import Path

from dotenv import load_dotenv
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from openai import OpenAI
from azure.identity import (
    DefaultAzureCredential,
    get_bearer_token_provider,
)


# =====================================================
# LOAD ENVIRONMENT VARIABLES
# =====================================================

BASE_DIR = Path(__file__).resolve().parents[2]
ENV_FILE = BASE_DIR / ".env"

load_dotenv(dotenv_path=ENV_FILE)


azure_openai_endpoint = os.getenv("AZURE_OPENAI_ENDPOINT")
model_deployment = os.getenv("MODEL_DEPLOYMENT")


# =====================================================
# VALIDATE AZURE CONFIGURATION
# =====================================================

if not azure_openai_endpoint:
    raise RuntimeError(
        "AZURE_OPENAI_ENDPOINT is not configured."
    )

if not model_deployment:
    raise RuntimeError(
        "MODEL_DEPLOYMENT is not configured."
    )


# =====================================================
# AZURE AUTHENTICATION
# =====================================================

token_provider = get_bearer_token_provider(
    DefaultAzureCredential(),
    "https://ai.azure.com/.default",
)


# =====================================================
# OPENAI CLIENT
# =====================================================

openai_client = OpenAI(
    base_url=azure_openai_endpoint,
    api_key=token_provider,
)


# =====================================================
# ROUTER
# =====================================================

router = APIRouter(
    prefix="/api/ai",
    tags=["AI"],
)


# =====================================================
# CHAT REQUEST
# =====================================================

class ChatRequest(BaseModel):
    message: str


# =====================================================
# CHAT
# =====================================================

@router.post("/chat")
def chat(request: ChatRequest):

    message = request.message.strip()

    if not message:
        raise HTTPException(
            status_code=400,
            detail="Message cannot be empty.",
        )

    try:

        # -------------------------------------------------
        # AZURE AI - LAB 3
        # -------------------------------------------------

        response = openai_client.responses.create(
            model=model_deployment,
            instructions=(
                "You are Jigyasa AI, a helpful learning assistant "
                "that answers questions and provides information "
                "clearly and accurately."
            ),
            input=message,
        )

        # -------------------------------------------------
        # RETURN AI RESPONSE
        # -------------------------------------------------

        return {
            "success": True,
            "message": response.output_text,
        }

    except Exception as ex:

        print("Azure AI Error:", ex)

        raise HTTPException(
            status_code=500,
            detail="Unable to generate an AI response.",
        )
