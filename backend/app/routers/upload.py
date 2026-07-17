from fastapi import APIRouter, File, HTTPException, UploadFile
from fastapi.responses import StreamingResponse

from app.services.pdf_service import pdf_service
from app.services.llm_service import llm_service
from app.schemas.analysis import AnalysisResponse

router = APIRouter(
    prefix="/api",
    tags=["Upload"],
)


@router.post(
    "/upload",
    response_model=AnalysisResponse,
)
async def upload_pdf(
    file: UploadFile = File(...)
):

    if file.content_type != "application/pdf":
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed.",
        )

    result = await pdf_service.save_pdf(file)
    try:
        document_text = pdf_service.extract_text(result["path"])

        analysis = llm_service.analyze_document(document_text)

        return {
            "success": True,
            "message": "Document analyzed successfully.",
            "filename": result["filename"],
            "analysis": analysis,
        }

    finally:
      pdf_service.delete_pdf(result["path"])   
@router.post("/upload/stream")
async def upload_pdf_stream(
    file: UploadFile = File(...)
):

    if file.content_type != "application/pdf":
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed."
        )

    result = await pdf_service.save_pdf(file)

    document_text = pdf_service.extract_text(result["path"])

    async def generate():

        try:
            for chunk in llm_service.stream_document(document_text):
                yield chunk

        finally:
            pdf_service.delete_pdf(result["path"])

    return StreamingResponse(
        generate(),
        media_type="text/plain"
    )