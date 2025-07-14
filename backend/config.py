import os
from typing import Optional

class Settings:
    # API Configuration
    API_TITLE: str = "EduAI Pro API"
    API_VERSION: str = "1.0.0"
    API_DESCRIPTION: str = "AI-Powered Educational Content Generation API"
    
    # Server Configuration
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    DEBUG: bool = True
    
    # CORS Configuration
    ALLOWED_ORIGINS: list = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:3001",
    ]
    
    # File Upload Configuration
    MAX_FILE_SIZE: int = 10 * 1024 * 1024  # 10MB
    ALLOWED_FILE_TYPES: list = [
        "text/plain",
        "application/pdf", 
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ]
    
    # AI Model Configuration (Add your API keys here)
    OPENAI_API_KEY: Optional[str] = os.getenv("OPENAI_API_KEY")
    GOOGLE_TRANSLATE_API_KEY: Optional[str] = os.getenv("GOOGLE_TRANSLATE_API_KEY")
    
    # Audio Configuration
    AUDIO_OUTPUT_DIR: str = "audio_files"
    SUPPORTED_AUDIO_FORMATS: list = ["mp3", "wav", "ogg"]

settings = Settings()
