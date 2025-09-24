from app.services.document_service import load_documents, split_documents
from app.infrastructure.embeddings import embedding_model
from langchain_community.vectorstores import FAISS

docs = split_documents(load_documents())
db = FAISS.from_documents(docs, embedding_model)
