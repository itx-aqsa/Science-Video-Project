from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.responses import StreamingResponse, JSONResponse, FileResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from datetime import datetime
import tempfile
import io
import os
import uuid
from core_logic import (
    generate_script, 
    generate_video_script_direct,  # New function for direct video script generation
    translate_script, 
    text_to_speech,
    extract_text_from_file,
    text_to_speech_from_content
)

app = FastAPI(
    title="EduAI Pro API",
    description="AI-Powered Educational Content Generation API",
    version="1.0.0"
)

# Create directories for storing files
os.makedirs("audio_files", exist_ok=True)
os.makedirs("uploads", exist_ok=True)

# Mount static files for audio serving
app.mount("/audio", StaticFiles(directory="audio_files"), name="audio")

# CORS middleware for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:3001",
        "*"  # For development
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Store audio files temporarily (in production, use proper storage)
audio_storage = {}

# Pydantic models
class ScriptRequest(BaseModel):
    topic: str
    duration: int
    audience_level: str = "general"
    language: str = "english"

class VideoScriptRequest(BaseModel):
    topic: str
    duration: int
    audience_level: str = "general"
    language: str = "english"

class TranslationRequest(BaseModel):
    text: str
    target_language: str
    source_language: str = "auto"

class TextToSpeechRequest(BaseModel):
    text: str
    voice_type: str = "female"
    speed: float = 1.0
    pitch: int = 0
    language: str = "en"

# API Endpoints
@app.get("/")
async def root():
    return {
        "message": "🎓 EduAI Pro API is running!",
        "version": "1.0.0",
        "status": "active",
        "endpoints": {
            "script_generation": "/generate-script",
            "video_script": "/generate-video-script", 
            "translation": "/translate-script",
            "text_to_speech": "/text-to-speech",
            "document_upload": "/upload-document",
            "health_check": "/health"
        }
    }

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "service": "EduAI Pro API",
        "message": "Backend is running smoothly! 🚀"
    }

@app.post("/generate-script")
async def generate_script_api(data: ScriptRequest):
    try:
        print(f"📝 Generating script for topic: {data.topic}")
        
        if not data.topic.strip():
            raise HTTPException(status_code=400, detail="Topic cannot be empty")
        
        if data.duration < 1 or data.duration > 60:
            raise HTTPException(status_code=400, detail="Duration must be between 1 and 60 minutes")
        
        # Generate script using your core logic
        script = generate_script(data.topic, data.duration)
        word_count = len(script.split())
        
        return {
            "success": True,
            "script": script,
            "word_count": word_count,
            "estimated_duration": f"{data.duration} minutes",
            "generated_at": datetime.now().isoformat()
        }
        
    except Exception as e:
        print(f"❌ Script generation error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Script generation failed: {str(e)}")

@app.post("/generate-video-script")
async def generate_video_script_api(data: VideoScriptRequest):
    try:
        print("🎬 Generating video-optimized script directly...")
        
        if not data.topic.strip():
            raise HTTPException(status_code=400, detail="Topic cannot be empty")
        
        if data.duration < 1 or data.duration > 60:
            raise HTTPException(status_code=400, detail="Duration must be between 1 and 60 minutes")
        
        # Generate video script directly without regular script first
        video_script = generate_video_script_direct(data.topic, data.duration)
        word_count = len(video_script.split())
        
        return {
            "success": True,
            "script": video_script,
            "word_count": word_count,
            "estimated_duration": f"{data.duration} minutes (video format)",
            "script_type": "video_optimized",
            "generated_at": datetime.now().isoformat()
        }
        
    except Exception as e:
        print(f"❌ Video script generation error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Video script generation failed: {str(e)}")

@app.post("/translate-script")
async def translate_script_api(data: TranslationRequest):
    try:
        print(f"🌐 Translating text to {data.target_language}")
        
        if not data.text.strip():
            raise HTTPException(status_code=400, detail="Text cannot be empty")
        
        # Translate using your core logic (with fallback)
        translated_text = translate_script(data.text, data.target_language)
        
        # Check if translation failed
        if translated_text.startswith("❌"):
            raise HTTPException(status_code=500, detail=translated_text)
        
        return {
            "success": True,
            "translated_text": translated_text,
            "source_language": "english",
            "target_language": data.target_language,
            "confidence_score": 0.95
        }
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"❌ Translation error: {str(e)}")
        
        # Provide a fallback response instead of complete failure
        fallback_message = f"""Translation service temporarily unavailable for {data.target_language}.

Original text (English):
{data.text[:500]}...

Please try again later or contact support.

---
*EduAI Pro - Translation Service*"""
        
        return {
            "success": False,
            "translated_text": fallback_message,
            "source_language": "english", 
            "target_language": data.target_language,
            "confidence_score": 0.0,
            "error": "Translation service unavailable"
        }

@app.post("/text-to-speech")
async def text_to_speech_api(request: TextToSpeechRequest):
    try:
        print(f"🎤 Converting text to speech...")
        
        if not request.text.strip():
            raise HTTPException(status_code=400, detail="Text cannot be empty")
        
        # Convert to speech using improved function
        status, audio_data = text_to_speech_from_content(request.text)
        
        if not audio_data:
            raise HTTPException(status_code=400, detail=status)
        
        # Generate unique filename
        audio_id = str(uuid.uuid4())
        audio_filename = f"audio_{audio_id}.mp3"
        audio_path = os.path.join("audio_files", audio_filename)
        
        # Save audio file
        with open(audio_path, 'wb') as f:
            f.write(audio_data)
        
        # Store audio info
        audio_storage[audio_id] = {
            "filename": audio_filename,
            "path": audio_path,
            "text": request.text[:100] + "..." if len(request.text) > 100 else request.text
        }
        
        # Calculate duration estimate
        word_count = len(request.text.split())
        estimated_duration_seconds = int(word_count / 2.5 * request.speed)
        duration_minutes = estimated_duration_seconds // 60
        duration_seconds = estimated_duration_seconds % 60
        
        print(f"✅ Audio saved: {audio_path}")
        
        return {
            "success": True,
            "audio_url": f"/audio/{audio_filename}",
            "audio_id": audio_id,
            "duration": f"{duration_minutes}:{duration_seconds:02d}",
            "file_size": f"{len(audio_data) / 1024:.1f} KB",
            "format": "MP3",
            "status": status
        }
        
    except Exception as e:
        print(f"❌ Text-to-speech error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Text-to-speech conversion failed: {str(e)}")

@app.post("/upload-document")
async def upload_document(file: UploadFile = File(...)):
    try:
        print(f"📄 Processing uploaded file: {file.filename}")
        
        if not file.filename:
            raise HTTPException(status_code=400, detail="No file provided")
        
        # Validate file type
        allowed_types = ["text/plain", "application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
        if file.content_type not in allowed_types:
            raise HTTPException(status_code=400, detail="Unsupported file type")
        
        # Read file content
        file_content = await file.read()
        file_size = len(file_content)
        
        print(f"📊 File size: {file_size} bytes")
        print(f"📋 Content type: {file.content_type}")
        
        # Extract text using improved function
        extracted_text = extract_text_from_file(
            file_content=file_content,
            filename=file.filename,
            content_type=file.content_type
        )
        
        if not extracted_text or extracted_text.startswith("Error"):
            return {
                "success": False,
                "filename": file.filename,
                "file_size": f"{file_size / 1024:.1f} KB",
                "error": extracted_text or "Failed to extract text",
                "detected_language": "Unknown",
                "confidence_score": 0.0,
                "word_count": 0,
                "estimated_audio_duration": "0 minutes",
                "extracted_text": "Text extraction failed"
            }
        
        # Calculate metrics
        word_count = len(extracted_text.split())
        estimated_duration = f"{word_count // 150} minutes"  # 150 words per minute average
        
        # Detect language
        try:
            from langdetect import detect
            detected_lang = detect(extracted_text)
            confidence = 0.95
        except:
            detected_lang = "en"
            confidence = 0.5
        
        print(f"✅ Text extracted successfully: {word_count} words")
        
        return {
            "success": True,
            "filename": file.filename,
            "file_size": f"{file_size / 1024:.1f} KB",
            "detected_language": detected_lang,
            "confidence_score": confidence,
            "word_count": word_count,
            "estimated_audio_duration": estimated_duration,
            "extracted_text": extracted_text[:1000] + "..." if len(extracted_text) > 1000 else extracted_text
        }
        
    except Exception as e:
        print(f"❌ Document upload error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Document upload failed: {str(e)}")

@app.get("/download-audio/{audio_id}")
async def download_audio(audio_id: str):
    try:
        if audio_id not in audio_storage:
            raise HTTPException(status_code=404, detail="Audio file not found")
        
        audio_info = audio_storage[audio_id]
        audio_path = audio_info["path"]
        
        if not os.path.exists(audio_path):
            raise HTTPException(status_code=404, detail="Audio file not found on disk")
        
        return FileResponse(
            path=audio_path,
            media_type="audio/mpeg",
            filename=audio_info["filename"]
        )
        
    except Exception as e:
        print(f"❌ Download error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Download failed: {str(e)}")

# Add OPTIONS handler for CORS preflight
@app.options("/{full_path:path}")
async def options_handler():
    return {"message": "OK"}

if __name__ == "__main__":
    import uvicorn
    print("🚀 Starting EduAI Pro FastAPI Server...")
    print("📍 Server will be available at: http://localhost:8000")
    print("📖 API Documentation: http://localhost:8000/docs")
    
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
