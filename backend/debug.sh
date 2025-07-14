#!/bin/bash

echo "🔍 EduAI Pro Backend Debug Script"
echo "================================="

# Check if Python is installed
echo "1. Checking Python installation..."
if command -v python3 &> /dev/null; then
    echo "✅ Python3 is installed: $(python3 --version)"
else
    echo "❌ Python3 is not installed"
    exit 1
fi

echo ""

# Check if required packages are installed
echo "2. Checking required packages..."
python3 -c "
try:
    import fastapi
    print('✅ FastAPI is installed')
except ImportError:
    print('❌ FastAPI is not installed')

try:
    import uvicorn
    print('✅ Uvicorn is installed')
except ImportError:
    print('❌ Uvicorn is not installed')

try:
    import pydantic
    print('✅ Pydantic is installed')
except ImportError:
    print('❌ Pydantic is not installed')
"

echo ""

# Check if backend files exist
echo "3. Checking backend files..."
if [ -f "main.py" ]; then
    echo "✅ main.py exists"
else
    echo "❌ main.py is missing"
fi

if [ -d "services" ]; then
    echo "✅ services directory exists"
else
    echo "❌ services directory is missing"
fi

echo ""

# Check if port 8000 is available
echo "4. Checking port 8000..."
if lsof -Pi :8000 -sTCP:LISTEN -t >/dev/null ; then
    echo "⚠️  Port 8000 is already in use"
    echo "   Kill the process or use a different port"
else
    echo "✅ Port 8000 is available"
fi

echo ""

# Try to start the server
echo "5. Testing server startup..."
echo "   Starting server for 5 seconds..."
timeout 5s python3 main.py &
sleep 2

# Test if server is responding
if curl -s http://localhost:8000/health > /dev/null; then
    echo "✅ Server is responding"
else
    echo "❌ Server is not responding"
fi

echo ""
echo "🏁 Debug complete!"
echo ""
echo "Next steps:"
echo "1. Fix any ❌ issues above"
echo "2. Run: python3 main.py"
echo "3. Test: http://localhost:8000"
