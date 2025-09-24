import os
from app.services.document_service import load_documents, split_documents
from langchain_community.vectorstores import FAISS
from app.infrastructure.embeddings import embedding_model
import unidecode

# 🔹 1. Charger les documents PDF
docs = load_documents()
print(f"Nombre de pages chargées : {len(docs)}")
for i, doc in enumerate(docs):
    print(f"Page {i+1} : {doc.page_content[:200]}...\n")

# 🔹 2. Découper en chunks
chunks = split_documents(docs)
print(f"Nombre de chunks générés : {len(chunks)}")

# 🔹 3. Vérifier si une FAQ est présente
for chunk in chunks:
    text = unidecode.unidecode(chunk.page_content.replace("\n", " ").lower())
    if "creer un compte" in text:
        print("✅ Chunk contenant 'Créer un compte' trouvé :")
        print(chunk.page_content[:500])
        print("---")

# 🔹 4. Créer le vectorstore FAISS
db = FAISS.from_documents(chunks, embedding_model)
print("Vectorstore FAISS créé avec succès !")
