#!/bin/bash

echo "🚀 Starting EduAI Pro Backend with Real AI..."
echo "============================================"

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8+"
    exit 1
fi

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Install requirements
echo "📦 Installing dependencies..."
pip install -r requirements.txt

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found. Please create it with your API keys."
    exit 1
fi

# Start the server
echo "🌟 Starting FastAPI server with Real AI Integration..."
echo "📍 Server: http://localhost:8000"
echo "📖 API Docs: http://localhost:8000/docs"
echo "🤖 Using Groq AI + Google Translate + Wikipedia"
echo ""
echo "Press Ctrl+C to stop the server"
echo "============================================"

python main.py
