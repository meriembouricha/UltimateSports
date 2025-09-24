from pydantic import BaseModel

class QuestionRequest(BaseModel):
    question: str

class LanguageRequest(BaseModel):
    language: str
