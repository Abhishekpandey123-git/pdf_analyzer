from pathlib import Path
from uuid import uuid4
import fitz
from fastapi import UploadFile
import os

from app.config.settings import settings


class PDFService:

    @staticmethod
    async def save_pdf(file: UploadFile):

        upload_dir = settings.upload_path
        upload_dir.mkdir(parents=True, exist_ok=True)

        extension = Path(file.filename).suffix.lower()

        filename = f"{uuid4().hex}{extension}"

        file_path = upload_dir / filename

        contents = await file.read()

        with open(file_path, "wb") as pdf:
            pdf.write(contents)

        return {
            "filename": filename,
            "original_filename": file.filename,
            "size": len(contents),
            "path": str(file_path),
        } 
    @staticmethod
    def extract_text(file_path: str) -> str:
        """
        Extract all text from a PDF.
        """
        document = fitz.open(file_path)
        try:
            text = ""

            for page in document:
                text += page.get_text()

            return text

        finally:
            document.close()
    @staticmethod
    def delete_pdf(file_path: str) -> None:
        """
        Delete uploaded PDF after processing.
        """

        if os.path.exists(file_path):
            os.remove(file_path)        


pdf_service = PDFService()