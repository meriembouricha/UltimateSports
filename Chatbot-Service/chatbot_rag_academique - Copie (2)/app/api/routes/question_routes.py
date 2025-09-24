from fastapi import APIRouter
from app.models.schemas import QuestionRequest
from app.services.chatbot_service import ask_question

router = APIRouter()

@router.post("/ask")
def ask(request: QuestionRequest):
    return ask_question(request)
