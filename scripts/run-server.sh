#!/bin/bash

# EduAI Pro FastAPI Server Startup Script

echo "🚀 Starting EduAI Pro FastAPI Backend..."
echo "=================================="

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8+"
    exit 1
fi

# Check if pip is installed
if ! command -v pip3 &> /dev/null; then
    echo "❌ pip3 is not installed. Please install pip"
    exit 1
fi

# Install requirements
echo "📦 Installing dependencies..."
pip3 install -r requirements.txt

# Start the server
echo "🌟 Starting FastAPI server on http://localhost:8000"
echo "📖 API Documentation will be available at http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop the server"
echo "=================================="

python3 fastapi-backend.py
