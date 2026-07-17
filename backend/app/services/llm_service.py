import google.generativeai as genai

from app.config.settings import settings

class LLMService:
    """
    Handles all interactions with the LLM.
    """
    def __init__(self) -> None:
        genai.configure(api_key=settings.google_api_key)

        self.model = genai.GenerativeModel(settings.gemini_model)

    @staticmethod
    def build_prompt(document_text: str) -> str:
        return f"""
You are an expert document analyst.

Analyze the following document.

Return:

## Executive Summary

## Key Points

## Important Dates

## Important People

## Action Items

## Keywords

Document:

{document_text}
"""
    def analyze_document(self, document_text: str) -> str:

        prompt = self.build_prompt(document_text)

        try:
            response = self.model.generate_content(prompt)
            return response.text

        except Exception as e:
            raise Exception(f"Gemini Error: {e}")
    def stream_document(self, document_text: str):

        prompt = self.build_prompt(document_text)

        try:
            response = self.model.generate_content(
                prompt,
                stream=True
            )

            for chunk in response:
                if chunk.text:
                    yield chunk.text

        except Exception as e:
            raise Exception(f"Gemini Streaming Error: {e}")

llm_service = LLMService()