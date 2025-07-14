@echo off
echo 🚀 Starting EduAI Pro Backend with Real AI...
echo ============================================

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python is not installed. Please install Python 3.8+
    pause
    exit /b 1
)

REM Create virtual environment if it doesn't exist
if not exist "venv" (
    echo 📦 Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment
echo 🔧 Activating virtual environment...
call venv\Scripts\activate.bat

REM Install requirements
echo 📦 Installing dependencies...
pip install -r requirements.txt

REM Check if .env file exists
if not exist ".env" (
    echo ⚠️  .env file not found. Please create it with your API keys.
    pause
    exit /b 1
)

REM Start the server
echo 🌟 Starting FastAPI server with Real AI Integration...
echo 📍 Server: http://localhost:8000
echo 📖 API Docs: http://localhost:8000/docs
echo 🤖 Using Groq AI + Google Translate + Wikipedia
echo.
echo Press Ctrl+C to stop the server
echo ============================================

python main.py
