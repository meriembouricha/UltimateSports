from app.core.prompts import prompt_template
from app.infrastructure.llm import llm
from app.infrastructure.vectorstore import db
from langchain.chains import RetrievalQA
from app.services.language_service import current_language

qa = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",
    retriever=db.as_retriever(),
    return_source_documents=False,
    chain_type_kwargs={"prompt": prompt_template}
)

custom_responses_fr = {
    "bonjour": "Bonjour ! Comment puis-je vous aider aujourd’hui ? 😊",
    "salut": "Salut ! N’hésitez pas à poser votre question 📘",
}

custom_responses_en = {
    "hello": "Hello! How can I assist you today? 😊",
    "hi": "Hi! Feel free to ask any questions 📘",
}

def ask_question(request):
    question = request.question.strip().lower()
    if current_language == "fr":
        responses = custom_responses_fr
    else:
        responses = custom_responses_en

    if question in responses:
        return {"answer": responses[question]}

    result = qa.run(request.question)
    return {"answer": result}
