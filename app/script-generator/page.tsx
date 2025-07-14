"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function ScriptGenerator() {
  const [topic, setTopic] = useState("")
  const [duration, setDuration] = useState("5")
  const [generatedScript, setGeneratedScript] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState("chinese-simplified")
  const [translatedScript, setTranslatedScript] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isTranslating, setIsTranslating] = useState(false)

  const handleGenerateScript = async () => {
    if (!topic.trim()) {
      alert("Please enter a topic first!")
      return
    }

    console.log("🚀 Starting API call to backend...")
    setIsLoading(true)

    try {
      console.log("📡 Making API request to: http://localhost:8000/generate-script")
      console.log("📝 Request data:", {
        topic: topic,
        duration: Number.parseInt(duration),
        audience_level: "general",
        language: "english",
      })

      const response = await fetch("http://localhost:8000/generate-script", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: topic,
          duration: Number.parseInt(duration),
          audience_level: "general",
          language: "english",
        }),
      })

      console.log("📨 Response status:", response.status)
      console.log("📨 Response ok:", response.ok)

      if (!response.ok) {
        const errorText = await response.text()
        console.error("❌ API Error Response:", errorText)
        throw new Error(`API Error: ${response.status} - ${errorText}`)
      }

      const data = await response.json()
      console.log("✅ API Response received:", data)

      setGeneratedScript(data.script)
      console.log("✅ Script set successfully!")

      // Show success message
      alert("✅ Script generated successfully using AI!")
    } catch (error: unknown) {
  console.error("❌ Error generating script:", error)

  // Show detailed error to user
  if (error instanceof Error) {
    if (error.message.includes("fetch")) {
      alert("❌ Cannot connect to backend server. Make sure backend is running on http://localhost:8000")
    } else {
      alert(`❌ Error: ${error.message}`)
    }
  } else {
    alert("❌ Unknown error occurred while generating the script.")
  }

  // Fallback to dummy content for demo
  console.log("🔄 Using fallback dummy content...")
  const dummyScript = `# Educational Script: ${topic}

## Introduction
Welcome to our educational content about ${topic}. This is a ${duration}-minute educational script.

## Main Content
This script covers the key concepts and important information about ${topic}.

### Key Points:
1. Introduction to the topic
2. Main concepts and definitions  
3. Practical examples and applications
4. Summary and key takeaways

## Conclusion
This script is designed to be engaging and informative for learners of all levels.

---
*[DEMO MODE - Backend not connected. This is dummy content.]*`

      setGeneratedScript(dummyScript)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClearAll = () => {
    console.log("🗑️ Clearing all content")
    setTopic("")
    setDuration("5")
    setGeneratedScript("")
    setTranslatedScript("")
  }

  const handleDownloadScript = () => {
    if (!generatedScript) {
      alert("No script to download!")
      return
    }

    const element = document.createElement("a")
    const file = new Blob([generatedScript], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = `${topic.replace(/\s+/g, "_")}_script.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)

    console.log("📥 Script downloaded")
  }

  const handleGenerateForVideo = async () => {
    if (!topic.trim()) {
      alert("Please enter a topic first!")
      return
    }

    console.log("🎬 Generating video-optimized script...")
    setIsLoading(true)

    try {
      const response = await fetch("http://localhost:8000/generate-video-script", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: topic, // Send topic instead of script_content
          duration: Number.parseInt(duration), // Send duration
          audience_level: "general", // Add audience_level
          language: "english", // Add language
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate video script")
      }

      const data = await response.json()
      setGeneratedScript(data.script)
      console.log("✅ Video script generated successfully")
      alert("✅ Video-optimized script generated!")
    } catch (error) {
      console.error("❌ Error generating video script:", error)
      alert("❌ Failed to generate video script. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleTranslateScript = async () => {
    if (!generatedScript.trim()) {
      alert("Please generate a script first!")
      return
    }

    console.log(`🌐 Translating script to ${selectedLanguage}...`)
    setIsTranslating(true)

    try {
      const response = await fetch("http://localhost:8000/translate-script", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: generatedScript,
          target_language: selectedLanguage,
          source_language: "auto",
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to translate script")
      }

      const data = await response.json()
      setTranslatedScript(data.translated_text)
      console.log("✅ Script translated successfully")
      alert("✅ Script translated successfully!")
    } catch (error) {
      console.error("❌ Error translating script:", error)
      alert("❌ Failed to translate script. Please try again.")
    } finally {
      setIsTranslating(false)
    }
  }

  const handleDownloadTranslation = () => {
    if (!translatedScript) {
      alert("No translation to download!")
      return
    }

    const element = document.createElement("a")
    const file = new Blob([translatedScript], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = `${topic.replace(/\s+/g, "_")}_${selectedLanguage}_translation.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)

    console.log("📥 Translation downloaded")
  }

  const languages = [
    { value: "urdu", label: "Urdu (اردو)" },
    { value: "chinese-simplified", label: "Chinese (Simplified)" },
    { value: "chinese-traditional", label: "Chinese (Traditional)" },
    { value: "arabic", label: "Arabic (العربية)" },
    { value: "hindi", label: "Hindi (हिन्दी)" },
    { value: "turkish", label: "Turkish" },
    { value: "french", label: "French" },
    { value: "spanish", label: "Spanish" },
    { value: "german", label: "German" },
    { value: "italian", label: "Italian" },
    { value: "russian", label: "Russian" },
    { value: "japanese", label: "Japanese" },
    { value: "portuguese", label: "Portuguese" },
    { value: "korean", label: "Korean" },
  ]

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1">
        <div className="container py-4">
          <div className="text-center mb-5">
            <h1 className="display-4 fw-bold text-primary mb-3">🎬 AI Script Generator</h1>
            <p className="lead text-muted">Create engaging educational scripts in minutes with AI power</p>
          </div>

          {/* Backend Status Indicator */}
          <div className="row mb-4">
            <div className="col-12">
              <div className="alert alert-info">
                <i className="fas fa-info-circle me-2"></i>
                <strong>Backend Status:</strong> Make sure your FastAPI backend is running on
                <code className="ms-1">http://localhost:8000</code>
                <button
                  className="btn btn-sm btn-outline-primary ms-3"
                  onClick={() => {
                    fetch("http://localhost:8000/health")
                      .then((res) => res.json())
                      .then((data) => alert(`✅ Backend is running! ${data.message}`))
                      .catch((err) => alert("❌ Backend is not running! Please start the FastAPI server."))
                  }}
                >
                  Test Backend Connection
                </button>
              </div>
            </div>
          </div>

          {/* Input Section */}
          <div className="row mb-4">
            <div className="col-12">
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-primary text-white">
                  <h5 className="card-title mb-0">
                    <i className="fas fa-edit me-2"></i>
                    Script Configuration
                  </h5>
                </div>
                <div className="card-body p-4">
                  <div className="row">
                    <div className="col-md-8 mb-3">
                      <label htmlFor="topicInput" className="form-label fw-semibold">
                        <i className="fas fa-lightbulb me-2 text-warning"></i>
                        Enter Topic
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        id="topicInput"
                        placeholder="e.g., Photosynthesis, World War II, Machine Learning, Climate Change"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                      />
                      <div className="form-text">
                        <i className="fas fa-info-circle me-1"></i>
                        Be specific for better results. Include key aspects you want covered.
                      </div>
                    </div>

                    <div className="col-md-4 mb-3">
                      <label htmlFor="durationSelect" className="form-label fw-semibold">
                        <i className="fas fa-clock me-2 text-info"></i>
                        Duration (minutes)
                      </label>
                      <select
                        className="form-select form-select-lg"
                        id="durationSelect"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                      >
                        {Array.from({ length: 30 }, (_, i) => i + 1).map((num) => (
                          <option key={num} value={num}>
                            {num} minute{num > 1 ? "s" : ""}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12">
                      <div className="d-flex flex-column flex-md-row gap-3">
                        <button
                          className="btn btn-primary btn-lg px-4"
                          onClick={handleGenerateScript}
                          disabled={!topic.trim() || isLoading}
                        >
                          {isLoading ? (
                            <>
                              <span
                                className="spinner-border spinner-border-sm me-2"
                                role="status"
                                aria-hidden="true"
                              ></span>
                              Generating...
                            </>
                          ) : (
                            <>
                              <i className="fas fa-magic me-2"></i>
                              Generate Script
                            </>
                          )}
                        </button>
                        <button className="btn btn-outline-secondary btn-lg px-4" onClick={handleClearAll}>
                          <i className="fas fa-trash me-2"></i>
                          Clear All Content
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Generated Script Display */}
          {generatedScript && (
            <div className="row mb-4">
              <div className="col-12">
                <div className="card border-0 shadow-sm">
                  <div className="card-header bg-success text-white">
                    <h5 className="card-title mb-0">
                      <i className="fas fa-file-alt me-2"></i>
                      Generated Script
                    </h5>
                  </div>
                  <div className="card-body p-4">
                    <div className="bg-light border rounded p-4 mb-4" style={{ maxHeight: "400px", overflowY: "auto" }}>
                      <pre className="mb-0" style={{ whiteSpace: "pre-wrap", fontFamily: "inherit", fontSize: "1rem" }}>
                        {generatedScript}
                      </pre>
                    </div>

                    {/* Post-Generation Buttons */}
                    <div className="row">
                      <div className="col-12">
                        <div className="d-flex flex-column flex-md-row gap-3">
                          <button className="btn btn-outline-primary btn-lg px-4" onClick={handleDownloadScript}>
                            <i className="fas fa-download me-2"></i>
                            Download Script
                          </button>
                          <button className="btn btn-outline-success btn-lg px-4" onClick={handleGenerateForVideo}>
                            <i className="fas fa-video me-2"></i>
                            Optimize for Video
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Translation Section */}
          {generatedScript && (
            <div className="row mb-4">
              <div className="col-12">
                <div className="card border-0 shadow-sm">
                  <div className="card-header bg-info text-white">
                    <h3 className="card-title mb-0">
                      <i className="fas fa-globe me-2"></i>
                      Translate Script
                    </h3>
                  </div>
                  <div className="card-body p-4">
                    <div className="row mb-4">
                      <div className="col-md-6">
                        <label htmlFor="languageSelect" className="form-label fw-semibold">
                          <i className="fas fa-language me-2 text-primary"></i>
                          Select Target Language
                        </label>
                        <select
                          className="form-select form-select-lg"
                          id="languageSelect"
                          value={selectedLanguage}
                          onChange={(e) => setSelectedLanguage(e.target.value)}
                        >
                          {languages.map((lang) => (
                            <option key={lang.value} value={lang.value}>
                              {lang.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="d-flex flex-column flex-md-row gap-3 mb-4">
                      <button
                        className="btn btn-info btn-lg px-4"
                        onClick={handleTranslateScript}
                        disabled={isTranslating}
                      >
                        {isTranslating ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            Translating...
                          </>
                        ) : (
                          <>
                            <i className="fas fa-exchange-alt me-2"></i>
                            Translate Script
                          </>
                        )}
                      </button>
                      {translatedScript && (
                        <button className="btn btn-outline-info btn-lg px-4" onClick={handleDownloadTranslation}>
                          <i className="fas fa-download me-2"></i>
                          Download Translation
                        </button>
                      )}
                    </div>

                    {/* Translated Script Display */}
                    {translatedScript && (
                      <div className="bg-light border rounded p-4" style={{ maxHeight: "400px", overflowY: "auto" }}>
                        <div className="d-flex align-items-center mb-3">
                          <i className="fas fa-check-circle text-success me-2"></i>
                          <h6 className="text-muted mb-0">
                            Translated to:{" "}
                            <span className="text-primary fw-bold">
                              {languages.find((l) => l.value === selectedLanguage)?.label}
                            </span>
                          </h6>
                        </div>
                        <pre
                          className="mb-0"
                          style={{ whiteSpace: "pre-wrap", fontFamily: "inherit", fontSize: "1rem" }}
                        >
                          {translatedScript}
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Help Section */}
          {!generatedScript && (
            <div className="row">
              <div className="col-12">
                <div className="card border-info border-2">
                  <div className="card-body p-4">
                    <h6 className="card-title text-info mb-3">
                      <i className="fas fa-lightbulb me-2"></i>
                      Tips for Better Scripts
                    </h6>
                    <div className="row">
                      <div className="col-md-6">
                        <ul className="list-unstyled">
                          <li className="mb-2">
                            <i className="fas fa-check text-success me-2"></i>
                            Be specific with your topic
                          </li>
                          <li className="mb-2">
                            <i className="fas fa-check text-success me-2"></i>
                            Include target audience level
                          </li>
                          <li className="mb-2">
                            <i className="fas fa-check text-success me-2"></i>
                            Mention key concepts to cover
                          </li>
                        </ul>
                      </div>
                      <div className="col-md-6">
                        <ul className="list-unstyled">
                          <li className="mb-2">
                            <i className="fas fa-check text-success me-2"></i>
                            Choose appropriate duration
                          </li>
                          <li className="mb-2">
                            <i className="fas fa-check text-success me-2"></i>
                            Review and customize output
                          </li>
                          <li className="mb-2">
                            <i className="fas fa-check text-success me-2"></i>
                            Use translations for global reach
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
