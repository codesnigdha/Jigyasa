from fastapi import APIRouter, HTTPException
from pydantic import BaseModel


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

    # -------------------------------------------------
    # TEMPORARY RESPONSE
    # -------------------------------------------------
    #
    # Actual AI model will be connected next.
    #

    return {
        "success": True,
        "message": (
            f"I received your question: "
            f"'{message}'. "
            f"Jigyasa AI is ready to help."
        ),
    }
