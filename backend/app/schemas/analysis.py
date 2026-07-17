from pydantic import BaseModel


class AnalysisResponse(BaseModel):
    success: bool
    message: str
    filename: str
    analysis: str