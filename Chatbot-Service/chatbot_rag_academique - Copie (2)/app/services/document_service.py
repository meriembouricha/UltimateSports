import os
from app.core.config import DATA_FOLDER
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter

def load_documents():
    pdf_files = [os.path.join(DATA_FOLDER, f) for f in os.listdir(DATA_FOLDER) if f.lower().endswith(".pdf")]
    print("Fichiers PDF trouvés :", pdf_files)  # 🔹 debug
    all_docs = []
    for file_path in pdf_files:
        loader = PyPDFLoader(file_path)
        pages = loader.load()
        print(f"{file_path} → {len(pages)} pages chargées")  # 🔹 debug
        all_docs.extend(pages)
    return all_docs

def split_documents(docs):
    splitter = RecursiveCharacterTextSplitter(chunk_size=300, chunk_overlap=50)
    chunks = splitter.split_documents(docs)
    print(f"Nombre de chunks générés : {len(chunks)}")  # 🔹 debug
    return chunks
