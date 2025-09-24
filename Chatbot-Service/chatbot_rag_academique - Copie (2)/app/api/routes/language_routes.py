from fastapi import APIRouter, HTTPException
from app.models.schemas import LanguageRequest
from app.services.language_service import set_language

router = APIRouter()

@router.post("/set_language")
def set_lang(request: LanguageRequest):
    return set_language(request.language)
