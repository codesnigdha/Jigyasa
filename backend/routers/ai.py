import os
from pathlib import Path

from dotenv import load_dotenv
from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from pydantic import BaseModel

from openai import OpenAI
from azure.identity import DefaultAzureCredential, get_bearer_token_provider

# Lab 20 - Azure Content Understanding
from azure.ai.contentunderstanding import ContentUnderstandingClient
from azure.ai.contentunderstanding.models import AnalysisInput, AnalysisResult
from azure.core.exceptions import AzureError


# =====================================================
# ENVIRONMENT
# =====================================================

BASE_DIR = Path(__file__).resolve().parents[2]
ENV_FILE = BASE_DIR / ".env"

load_dotenv(dotenv_path=ENV_FILE)


# =====================================================
# LAB 3 CONFIGURATION
# =====================================================

lab3_endpoint = os.getenv("AZURE_OPENAI_ENDPOINT_LAB")
lab3_model = os.getenv("MODEL_DEPLOYMENT_LAB3")


# =====================================================
# LAB 4 CONFIGURATION
# =====================================================

lab4_endpoint = os.getenv("AZURE_OPENAI_ENDPOINT_LAB")
lab4_model = os.getenv("MODEL_DEPLOYMENT_LAB4")


# =====================================================
# LAB 20 CONFIGURATION
# =====================================================

content_understanding_endpoint = os.getenv(
    "CONTENT_UNDERSTANDING_ENDPOINT"
)

content_understanding_analyzer = os.getenv(
    "CONTENT_UNDERSTANDING_ANALYZER"
)

content_understanding_api_version = os.getenv(
    "CONTENT_UNDERSTANDING_API_VERSION",
    "2025-11-01",
)


# =====================================================
# LAB 4 VALIDATION
# =====================================================

if not lab4_endpoint:
    raise RuntimeError(
        "AZURE_OPENAI_ENDPOINT_LAB is not configured."
    )

if not lab4_model:
    raise RuntimeError(
        "MODEL_DEPLOYMENT_LAB4 is not configured."
    )


# =====================================================
# LAB 20 VALIDATION
# =====================================================

if not content_understanding_endpoint:
    raise RuntimeError(
        "CONTENT_UNDERSTANDING_ENDPOINT is not configured."
    )

if not content_understanding_analyzer:
    raise RuntimeError(
        "CONTENT_UNDERSTANDING_ANALYZER is not configured."
    )


# =====================================================
# AZURE AUTHENTICATION
# =====================================================

token_provider = get_bearer_token_provider(
    DefaultAzureCredential(),
    "https://ai.azure.com/.default",
)


# =====================================================
# LAB 3 CLIENT
# =====================================================

lab3_client = None

if lab3_endpoint and lab3_model:
    lab3_client = OpenAI(
        base_url=lab3_endpoint,
        api_key=token_provider,
    )


# =====================================================
# LAB 4 CLIENT
# =====================================================

lab4_client = OpenAI(
    base_url=lab4_endpoint,
    api_key=token_provider,
)


# =====================================================
# LAB 20 CLIENT
# =====================================================

content_understanding_client = ContentUnderstandingClient(
    endpoint=content_understanding_endpoint,
    credential=DefaultAzureCredential(),
    api_version=content_understanding_api_version,
)


# =====================================================
# ROUTER
# =====================================================

router = APIRouter(
    prefix="/api/ai",
    tags=["AI"],
)


# =====================================================
# LAB 3 - TEXT CHAT
# =====================================================

class ChatRequest(BaseModel):
    message: str


@router.post("/chat")
def chat(request: ChatRequest):
    message = request.message.strip()

    if not message:
        raise HTTPException(
            status_code=400,
            detail="Message cannot be empty.",
        )

    if lab3_client is None:
        raise HTTPException(
            status_code=503,
            detail="Lab 3 Azure resource is not configured.",
        )

    try:
        response = lab3_client.responses.create(
            model=lab3_model,
            instructions=(
                "You are Jigyasa AI, a helpful learning assistant "
                "that answers questions and provides information "
                "clearly and accurately."
            ),
            input=message,
        )

        return {
            "success": True,
            "message": response.output_text,
        }

    except Exception as ex:
        print(
            "Azure AI Lab 3 Error:",
            repr(ex),
        )

        raise HTTPException(
            status_code=500,
            detail="Unable to generate an AI response.",
        )


# =====================================================
# LAB 4 - CREATE VECTOR STORE
# =====================================================

class VectorStoreResponse(BaseModel):
    success: bool
    vector_store_id: str
    message: str


@router.post(
    "/document/create-vector-store",
    response_model=VectorStoreResponse,
)
def create_vector_store():
    try:
        vector_store = lab4_client.vector_stores.create(
            name="jigyasa-document-store",
        )

        print(
            "LAB 4 VECTOR STORE CREATED:",
            vector_store.id,
        )

        return {
            "success": True,
            "vector_store_id": vector_store.id,
            "message": "Vector store created successfully.",
        }

    except Exception as ex:
        print(
            "Azure AI Lab 4 Vector Store Error:",
            repr(ex),
        )

        raise HTTPException(
            status_code=500,
            detail="Unable to create vector store.",
        )


# =====================================================
# LAB 4 - UPLOAD DOCUMENT
# =====================================================

@router.post("/document/upload")
def upload_document(
    vector_store_id: str = Form(...),
    file: UploadFile = File(...),
):
    vector_store_id = vector_store_id.strip()

    if not vector_store_id:
        raise HTTPException(
            status_code=400,
            detail="Vector store ID is required.",
        )

    if not vector_store_id.startswith("vs_"):
        raise HTTPException(
            status_code=400,
            detail="Invalid vector store ID.",
        )

    if not file.filename:
        raise HTTPException(
            status_code=400,
            detail="File is required.",
        )

    try:
        print(
            "LAB 4 UPLOADING FILE:",
            file.filename,
        )

        print(
            "LAB 4 VECTOR STORE:",
            vector_store_id,
        )

        print(
            "LAB 4 CONTENT TYPE:",
            file.content_type,
        )

        # -------------------------------------------------
        # UPLOAD FILE TO AZURE OPENAI
        # -------------------------------------------------

        uploaded_file = lab4_client.files.create(
            file=(
                file.filename,
                file.file,
                file.content_type or "application/octet-stream",
            ),
            purpose="assistants",
        )

        print(
            "LAB 4 FILE CREATED:",
            uploaded_file.id,
        )

        # -------------------------------------------------
        # ATTACH FILE TO VECTOR STORE
        # -------------------------------------------------

        vector_store_file = (
            lab4_client.vector_stores.files.create_and_poll(
                vector_store_id=vector_store_id,
                file_id=uploaded_file.id,
            )
        )

        print(
            "LAB 4 VECTOR STORE FILE:",
            vector_store_file.id,
        )

        print(
            "LAB 4 FILE STATUS:",
            vector_store_file.status,
        )

        # -------------------------------------------------
        # CHECK PROCESSING RESULT
        # -------------------------------------------------

        if vector_store_file.status != "completed":
            last_error = getattr(
                vector_store_file,
                "last_error",
                None,
            )

            raise HTTPException(
                status_code=500,
                detail=(
                    "Document processing failed. "
                    f"Status: {vector_store_file.status}. "
                    f"Error: {last_error}"
                ),
            )

        return {
            "success": True,
            "file_id": uploaded_file.id,
            "vector_store_file_id": vector_store_file.id,
            "filename": file.filename,
            "vector_store_id": vector_store_id,
            "status": vector_store_file.status,
            "message": "Document uploaded and processed successfully.",
        }

    except HTTPException:
        raise

    except Exception as ex:
        print(
            "Azure AI Lab 4 Upload Error:",
            repr(ex),
        )

        raise HTTPException(
            status_code=500,
            detail=(
                "Unable to upload and process the document. "
                "Check the Uvicorn terminal for the Azure error."
            ),
        )

    finally:
        try:
            file.file.close()
        except Exception:
            pass


# =====================================================
# LAB 4 - DOCUMENT CHAT
# =====================================================

class DocumentChatRequest(BaseModel):
    message: str
    vector_store_id: str
    previous_response_id: str | None = None


@router.post("/document/chat")
def document_chat(
    request: DocumentChatRequest,
):
    message = request.message.strip()
    vector_store_id = request.vector_store_id.strip()

    if not message:
        raise HTTPException(
            status_code=400,
            detail="Message cannot be empty.",
        )

    if not vector_store_id:
        raise HTTPException(
            status_code=400,
            detail="Vector store ID is required.",
        )

    if not vector_store_id.startswith("vs_"):
        raise HTTPException(
            status_code=400,
            detail="Invalid vector store ID.",
        )

    try:
        response = lab4_client.responses.create(
            model=lab4_model,
            instructions=(
                "You are Jigyasa AI, a helpful learning assistant. "
                "Use the uploaded documents to answer the user's "
                "questions. Summarize, explain, analyze, and extract "
                "important information from the documents. "
                "If the requested information cannot be found in "
                "the uploaded documents, clearly say so."
            ),
            input=message,
            previous_response_id=request.previous_response_id,
            tools=[
                {
                    "type": "file_search",
                    "vector_store_ids": [
                        vector_store_id
                    ],
                }
            ],
        )

        return {
            "success": True,
            "message": response.output_text,
            "response_id": response.id,
            "vector_store_id": vector_store_id,
        }

    except Exception as ex:
        print(
            "Azure AI Lab 4 Document Chat Error:",
            repr(ex),
        )

        raise HTTPException(
            status_code=500,
            detail=(
                "Unable to generate a response using "
                "the uploaded document."
            ),
        )


# =====================================================
# LAB 20 - IMAGE ANALYSIS
# =====================================================

@router.post("/image/analyze")
def analyze_image(
    file: UploadFile = File(...),
):
    # -------------------------------------------------
    # VALIDATE FILE
    # -------------------------------------------------

    if not file.filename:
        raise HTTPException(
            status_code=400,
            detail="Image file is required.",
        )

    if not file.content_type:
        raise HTTPException(
            status_code=400,
            detail="Image content type is missing.",
        )

    if not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=400,
            detail="Please upload a valid image file.",
        )

    try:
        print(
            "LAB 20 ANALYZING IMAGE:",
            file.filename,
        )

        print(
            "LAB 20 CONTENT TYPE:",
            file.content_type,
        )

        print(
            "LAB 20 ANALYZER:",
            content_understanding_analyzer,
        )

        # -------------------------------------------------
        # READ IMAGE
        # -------------------------------------------------

        file_bytes = file.file.read()

        if not file_bytes:
            raise HTTPException(
                status_code=400,
                detail="Uploaded image is empty.",
            )

        # -------------------------------------------------
        # ANALYZE IMAGE WITH AZURE CONTENT UNDERSTANDING
        # -------------------------------------------------

        poller = content_understanding_client.begin_analyze(
            analyzer_id=content_understanding_analyzer,
            inputs=[
                AnalysisInput(
                    data=file_bytes,
                )
            ],
        )

        result: AnalysisResult = poller.result()

        # -------------------------------------------------
        # EXTRACT DESCRIPTION AND TAGS
        # -------------------------------------------------

        if not result.contents:
            raise HTTPException(
                status_code=500,
                detail="Azure returned no analysis content.",
            )

        fields = result.contents[0].fields

        description = ""
        tags = []

        # -------------------------------------------------
        # DESCRIPTION
        # -------------------------------------------------

        if "Description" in fields:
            description_field = fields["Description"]

            description = getattr(
                description_field,
                "value_string",
                "",
            ) or ""

        # -------------------------------------------------
        # TAGS
        # -------------------------------------------------

        if "Tags" in fields:
            tags_field = fields["Tags"]

            tag_values = getattr(
                tags_field,
                "value_array",
                [],
            ) or []

            for tag in tag_values:
                tag_value = getattr(
                    tag,
                    "value_string",
                    None,
                )

                if tag_value:
                    tags.append(tag_value)

        print(
            "LAB 20 IMAGE ANALYSIS COMPLETED:",
            file.filename,
        )

        return {
            "success": True,
            "filename": file.filename,
            "analyzer": content_understanding_analyzer,
            "description": description,
            "tags": tags,
            "message": "Image analyzed successfully.",
        }

    except HTTPException:
        raise

    except AzureError as ex:
        print(
            "Azure AI Lab 20 Error:",
            repr(ex),
        )

        raise HTTPException(
            status_code=500,
            detail=(
                "Azure Content Understanding could not "
                "analyze the image."
            ),
        )

    except Exception as ex:
        print(
            "Lab 20 Image Analysis Error:",
            repr(ex),
        )

        raise HTTPException(
            status_code=500,
            detail=(
                "Unable to analyze the image. "
                "Check the Uvicorn terminal for the Azure error."
            ),
        )

    finally:
        try:
            file.file.close()
        except Exception:
            pass
