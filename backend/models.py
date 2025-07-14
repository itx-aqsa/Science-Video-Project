from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

# Request Models
class ScriptGenerateRequest(BaseModel):
    topic: str = Field(..., min_length=1, max_length=200, description="Educational topic")
    duration: int = Field(..., ge=1, le=60, description="Duration in minutes")
    audience_level: Optional[str] = Field("general", description="Target audience level")
    language: Optional[str] = Field("english", description="Output language")

class TranslateRequest(BaseModel):
    text: str = Field(..., min_length=1, description="Text to translate")
    target_language: str = Field(..., description="Target language code")
    source_language: Optional[str] = Field("auto", description="Source language code")

class TextToSpeechRequest(BaseModel):
    text: str = Field(..., min_length=1, description="Text to convert to speech")
    voice_type: Optional[str] = Field("female", description="Voice type")
    speed: Optional[float] = Field(1.0, ge=0.5, le=2.0, description="Speech speed")
    pitch: Optional[int] = Field(0, ge=-10, le=10, description="Voice pitch")
    language: Optional[str] = Field("en", description="Language code")

# Response Models
class ScriptGenerateResponse(BaseModel):
    success: bool
    script: str
    word_count: int
    estimated_duration: str
    generated_at: str

class TranslateResponse(BaseModel):
    success: bool
    translated_text: str
    source_language: str
    target_language: str
    confidence_score: float

class TextToSpeechResponse(BaseModel):
    success: bool
    audio_url: str
    duration: str
    file_size: str
    format: str

class DocumentUploadResponse(BaseModel):
    success: bool
    filename: str
    file_size: str
    detected_language: str
    confidence_score: float
    word_count: int
    estimated_audio_duration: str
    extracted_text: str

class ErrorResponse(BaseModel):
    success: bool = False
    error: str
    detail: Optional[str] = None
