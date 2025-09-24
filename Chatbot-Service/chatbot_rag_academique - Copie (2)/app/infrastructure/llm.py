from langchain_openai import ChatOpenAI
from app.core.config import OPENAI_API_KEY

llm = ChatOpenAI(
    model_name="gpt-4o-mini",
    openai_api_key=OPENAI_API_KEY
)
