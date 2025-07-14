import requests
import json

def test_backend():
    """Test if backend is working properly"""
    
    print("🧪 Testing EduAI Pro Backend...")
    print("=" * 40)
    
    # Test 1: Health Check
    try:
        response = requests.get("http://localhost:8000/health")
        if response.status_code == 200:
            print("✅ Health Check: PASSED")
            print(f"   Response: {response.json()}")
        else:
            print("❌ Health Check: FAILED")
            print(f"   Status Code: {response.status_code}")
    except Exception as e:
        print("❌ Health Check: FAILED")
        print(f"   Error: {str(e)}")
        return
    
    print()
    
    # Test 2: Script Generation
    try:
        payload = {
            "topic": "Machine Learning",
            "duration": 5,
            "audience_level": "general",
            "language": "english"
        }
        
        response = requests.post(
            "http://localhost:8000/generate-script",
            headers={"Content-Type": "application/json"},
            data=json.dumps(payload)
        )
        
        if response.status_code == 200:
            print("✅ Script Generation: PASSED")
            data = response.json()
            print(f"   Success: {data['success']}")
            print(f"   Word Count: {data['word_count']}")
            print(f"   Script Preview: {data['script'][:100]}...")
        else:
            print("❌ Script Generation: FAILED")
            print(f"   Status Code: {response.status_code}")
            print(f"   Response: {response.text}")
    except Exception as e:
        print("❌ Script Generation: FAILED")
        print(f"   Error: {str(e)}")
    
    print()
    
    # Test 3: Translation
    try:
        payload = {
            "text": "Hello, this is a test translation.",
            "target_language": "spanish",
            "source_language": "auto"
        }
        
        response = requests.post(
            "http://localhost:8000/translate-script",
            headers={"Content-Type": "application/json"},
            data=json.dumps(payload)
        )
        
        if response.status_code == 200:
            print("✅ Translation: PASSED")
            data = response.json()
            print(f"   Success: {data['success']}")
            print(f"   Source Language: {data['source_language']}")
            print(f"   Target Language: {data['target_language']}")
        else:
            print("❌ Translation: FAILED")
            print(f"   Status Code: {response.status_code}")
    except Exception as e:
        print("❌ Translation: FAILED")
        print(f"   Error: {str(e)}")
    
    print()
    print("🏁 Testing Complete!")

if __name__ == "__main__":
    test_backend()
