current_language = "fr"

def set_language(language):
    global current_language
    if language not in ["fr", "en"]:
        return {"error": "Langue non supportée"}
    current_language = language
    return {"message": "Langue changée avec succès", "language": current_language}
