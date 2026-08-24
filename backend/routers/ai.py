import os
import base64
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
# LAB 3 & LAB 4 USE THE SAME AZURE OPENAI DEPLOYMENT
# =====================================================

lab4_endpoint = os.getenv("AZURE_OPENAI_ENDPOINT_LAB")
lab4_model = os.getenv("MODEL_DEPLOYMENT_LAB3")


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
# IMAGE GENERATION CONFIGURATION
# =====================================================

image_endpoint = os.getenv("ENDPOINT")
image_model = os.getenv("MODEL_DEPLOYMENT")


# =====================================================
# LAB 3 / LAB 4 VALIDATION
# =====================================================

if not lab3_endpoint:
    raise RuntimeError(
        "AZURE_OPENAI_ENDPOINT_LAB is not configured."
    )

if not lab3_model:
    raise RuntimeError(
        "MODEL_DEPLOYMENT_LAB3 is not configured."
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

credential = DefaultAzureCredential()

token_provider = get_bearer_token_provider(
    credential,
    "https://ai.azure.com/.default",
)


# =====================================================
# LAB 3 CLIENT
# =====================================================

lab3_client = OpenAI(
    base_url=lab3_endpoint,
    api_key=token_provider,
)


# =====================================================
# LAB 4 CLIENT
# SAME AZURE OPENAI RESOURCE AS LAB 3
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
    credential=credential,
    api_version=content_understanding_api_version,
)


# =====================================================
# IMAGE GENERATION CLIENT
# =====================================================

image_client = None
image_token_provider = None

if image_endpoint and image_model:

    image_credential = DefaultAzureCredential(
        exclude_environment_credential=True,
        exclude_managed_identity_credential=True,
    )

    image_token_provider = get_bearer_token_provider(
        image_credential,
        "https://cognitiveservices.azure.com/.default",
    )

    image_client = OpenAI(
        base_url=image_endpoint,
        api_key=image_token_provider,
    )


# =====================================================
# ROUTER
# =====================================================

router = APIRouter(
    prefix="/api/ai",
    tags=["AI"],
)


# =====================================================
# IMAGE REQUEST DETECTION
# =====================================================

def is_image_request(message: str) -> bool:
    """
    Detect prompts that are asking Jigyasa to create an image.

    Examples:
        generate an image of a robot
        create a picture of a futuristic city
        make a photo of a sunset
        draw a cartoon cat
        generate image of a classroom
    """

    text = message.lower().strip()

    if not text:
        return False

    # Strong phrases that clearly indicate image generation.
    strong_phrases = [
        "generate an image",
        "generate image",
        "create an image",
        "create image",
        "make an image",
        "make image",
        "draw an image",
        "draw image",
        "generate a picture",
        "generate picture",
        "create a picture",
        "create picture",
        "make a picture",
        "make picture",
        "generate a photo",
        "generate photo",
        "create a photo",
        "create photo",
        "make a photo",
        "make photo",
        "generate artwork",
        "generate art",
        "create artwork",
        "create art",
    ]

    if any(phrase in text for phrase in strong_phrases):
        return True

    # Natural prompts such as:
    # "image of a beautiful waterfall"
    # "picture of a futuristic classroom"
    # "photo of a sunset"
    image_nouns = [
        "image of ",
        "picture of ",
        "photo of ",
        "photograph of ",
        "illustration of ",
        "artwork of ",
        "drawing of ",
    ]

    if any(phrase in text for phrase in image_nouns):
        return True

    # Commands such as:
    # "draw a cat"
    # "create a futuristic city image"
    # "make a realistic portrait"
    command_words = (
        "generate ",
        "create ",
        "make ",
        "draw ",
    )

    visual_words = (
        "image",
        "picture",
        "photo",
        "photograph",
        "portrait",
        "illustration",
        "artwork",
        "drawing",
        "wallpaper",
        "poster",
        "logo",
        "scene",
    )

    if text.startswith(command_words):
        return any(word in text for word in visual_words)

    return False


# =====================================================
# IMAGE GENERATION HELPER
# =====================================================

def generate_image_from_prompt(prompt: str) -> str:
    """
    Generate an image using the Azure OpenAI image deployment
    and return the image as a Base64 string.
    """

    if image_client is None:
        raise RuntimeError(
            "Image generation Azure resource is not configured. "
            "Check ENDPOINT and MODEL_DEPLOYMENT in .env."
        )

    if not image_model:
        raise RuntimeError(
            "MODEL_DEPLOYMENT is not configured in .env."
        )

    print("IMAGE GENERATION PROMPT:", prompt)

    image = image_client.images.generate(
        model=image_model,
        prompt=prompt,
        n=1,
    )

    image_data = image.data[0].b64_json

    if not image_data:
        raise RuntimeError(
            "Azure did not return image data."
        )

    # Validate the returned Base64 data.
    base64.b64decode(image_data)

    print("IMAGE GENERATION COMPLETED")

    return image_data


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

    # -------------------------------------------------
    # IMAGE GENERATION
    # -------------------------------------------------
    #
    # The existing frontend already sends normal prompts
    # to /api/ai/chat. Therefore image prompts are detected
    # here and automatically routed to Azure image generation.
    #
    # This keeps normal text chat working exactly as before.
    # -------------------------------------------------

    if is_image_request(message):

        try:
            image_data = generate_image_from_prompt(message)

            return {
                "success": True,
                "type": "image",
                "message": "Here is your generated image.",
                "prompt": message,
                "image": image_data,
                "mime_type": "image/png",
            }

        except Exception as ex:

            print(
                "Azure Image Generation Error:",
                repr(ex),
            )

            raise HTTPException(
                status_code=500,
                detail=(
                    "Unable to generate the image. "
                    "Check the Uvicorn terminal for the Azure error."
                ),
            )

    # -------------------------------------------------
    # NORMAL LAB 3 TEXT CHAT
    # -------------------------------------------------

    try:

        response = lab3_client.responses.create(
            model=lab3_model,
            instructions=(
                "You are Jigyasa AI, a helpful learning assistant "
                "that answers questions and provides information "
                "clearly and accurately. "
                "If the user asks to create, generate, draw, or make "
                "an image, that request should be handled by the "
                "image-generation capability rather than answered "
                "as plain text."
            ),
            input=message,
        )

        return {
            "success": True,
            "type": "text",
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
# IMAGE GENERATION
# =====================================================

class ImageGenerationRequest(BaseModel):
    prompt: str


@router.post("/image/generate")
def generate_image(request: ImageGenerationRequest):

    prompt = request.prompt.strip()

    if not prompt:
        raise HTTPException(
            status_code=400,
            detail="Prompt cannot be empty.",
        )

    if image_client is None:
        raise HTTPException(
            status_code=503,
            detail=(
                "Image generation Azure resource is not configured. "
                "Check ENDPOINT and MODEL_DEPLOYMENT in .env."
            ),
        )

    try:

        image_data = generate_image_from_prompt(prompt)

        return {
            "success": True,
            "type": "image",
            "prompt": prompt,
            "image": image_data,
            "mime_type": "image/png",
            "message": "Image generated successfully.",
        }

    except HTTPException:
        raise

    except Exception as ex:

        print(
            "Azure Image Generation Error:",
            repr(ex),
        )

        raise HTTPException(
            status_code=500,
            detail=(
                "Unable to generate image. "
                "Check the Uvicorn terminal for the Azure error."
            ),
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
