import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import question_routes, language_routes
from app.services.document_service import load_documents, split_documents

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

import unidecode

@app.on_event("startup")
def check_chunks_on_startup():
    docs = split_documents(load_documents())
    for doc in docs:
        text = unidecode.unidecode(doc.page_content.replace("\n", " ").lower())
        if "creer un compte" in text:
            logger.info("Chunk trouvé : %s", doc.page_content[:300])

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(question_routes.router)
app.include_router(language_routes.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
