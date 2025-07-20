"use client"

import type React from "react"
import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function TextToSpeech() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [detectedLanguage, setDetectedLanguage] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [audioGenerated, setAudioGenerated] = useState(false)
  const [extractedText, setExtractedText] = useState("")
  const [generatedAudioUrl, setGeneratedAudioUrl] = useState("")
  const [audioId, setAudioId] = useState("")
  const [audioInfo, setAudioInfo] = useState({
    duration: "",
    fileSize: "",
    wordCount: 0,
  })

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setSelectedFile(file)
    setIsProcessing(true)
    setAudioGenerated(false)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("https://content-generation-and-translation.streamlit.app/upload-document", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to process document")
      }

      const data = await response.json()
      setDetectedLanguage(data.detected_language)
      setExtractedText(data.extracted_text)
      setAudioInfo({
        duration: data.estimated_audio_duration,
        fileSize: data.file_size,
        wordCount: data.word_count,
      })

      console.log("✅ Document processed successfully")
    } catch (error) {
      console.error("❌ Error processing document:", error)
      alert("Failed to process document. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  const convertToSpeech = async (textContent: string) => {
    if (!textContent.trim()) return

    setIsProcessing(true)
    try {
      const response = await fetch("https://content-generation-and-translation.streamlit.app/text-to-speech", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: textContent,
          voice_type: "female",
          speed: 1.0,
          pitch: 0,
          language: detectedLanguage || "en",
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate audio")
      }

      const data = await response.json()
      setAudioGenerated(true)
      setGeneratedAudioUrl(`https://content-generation-and-translation.streamlit.app/${data.audio_url}`)
      setAudioId(data.audio_id)
      setAudioInfo((prev) => ({
        ...prev,
        duration: data.duration,
        fileSize: data.file_size,
      }))

      console.log("✅ Audio generated successfully")
      console.log("🎵 Audio URL:", `https://content-generation-and-translation.streamlit.app/${data.audio_url}`)
    } catch (error) {
      console.error("❌ Error generating audio:", error)
      alert("Failed to generate audio. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  const handleClearFile = () => {
    setSelectedFile(null)
    setDetectedLanguage("")
    setAudioGenerated(false)
    setIsProcessing(false)
    setExtractedText("")
    setGeneratedAudioUrl("")
    setAudioId("")
    console.log("File cleared")
  }

  const handleDownloadAudio = async () => {
    if (!audioId) {
      alert("No audio to download!")
      return
    }

    try {
      const response = await fetch(`https://content-generation-and-translation.streamlit.app/download-audio/${audioId}`)

      if (!response.ok) {
        throw new Error("Failed to download audio")
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const element = document.createElement("a")
      element.href = url
      element.download = `audio_${selectedFile?.name || "generated"}.mp3`
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
      window.URL.revokeObjectURL(url)

      console.log("📥 Audio downloaded successfully")
    } catch (error) {
      console.error("❌ Download error:", error)
      alert("Failed to download audio. Please try again.")
    }
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1">
        <div className="container py-4">
          <div className="text-center mb-5">
            <h1 className="display-4 fw-bold text-primary mb-3">🎙️ Language Detection & Text-to-Speech Converter</h1>
            <p className="lead text-muted">Upload a TXT, PDF, or DOCX file</p>
          </div>

          {/* File Upload Section */}
          <div className="row mb-4">
            <div className="col-12">
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="text-center p-5 border-2 border-dashed rounded" style={{ borderColor: "#dee2e6" }}>
                    <i className="fas fa-cloud-upload-alt fs-1 text-muted mb-3"></i>
                    <h5 className="mb-3">Drag and drop file here</h5>
                    <p className="text-muted mb-3">Limit 200MB per file • TXT, PDF, DOCX</p>

                    <input
                      type="file"
                      className="d-none"
                      id="fileInput"
                      accept=".txt,.pdf,.docx"
                      onChange={handleFileUpload}
                    />
                    <label htmlFor="fileInput" className="btn btn-primary btn-lg">
                      Browse files
                    </label>
                  </div>

                  {selectedFile && (
                    <div className="mt-4 p-3 bg-light rounded d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <i className="fas fa-file-alt fs-4 text-primary me-3"></i>
                        <div>
                          <h6 className="mb-0">{selectedFile.name}</h6>
                          <small className="text-muted">{(selectedFile.size / 1024).toFixed(1)} KB</small>
                        </div>
                      </div>
                      <button className="btn btn-outline-danger btn-sm" onClick={handleClearFile}>
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Convert Button */}
          {selectedFile && !isProcessing && (
            <div className="row mb-4">
              <div className="col-12 text-center">
                <button
                  className="btn btn-success btn-lg px-5"
                  onClick={() => convertToSpeech(extractedText)}
                  disabled={!extractedText.trim()}
                >
                  <i className="fas fa-play me-2"></i>
                  Convert to Speech
                </button>
              </div>
            </div>
          )}

          {/* Processing Status */}
          {isProcessing && (
            <div className="row mb-4">
              <div className="col-12">
                <div className="card border-0 shadow-sm">
                  <div className="card-body text-center p-5">
                    <div
                      className="spinner-border text-primary mb-4"
                      style={{ width: "3rem", height: "3rem" }}
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <h5 className="fw-bold mb-3">
                      <i className="fas fa-cog fa-spin me-2"></i>
                      Processing Your Document
                    </h5>
                    <p className="text-muted mb-0">
                      Analyzing content, detecting language, and generating high-quality audio...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Language Detection Results */}
          {detectedLanguage && !isProcessing && (
            <div className="row mb-4">
              <div className="col-12">
                <div className="text-center mb-3">
                  <h6 className="text-muted">
                    Language detected: <span className="text-primary fw-bold">{detectedLanguage}</span>
                  </h6>
                </div>
              </div>
            </div>
          )}

          {/* Audio Player */}
          {audioGenerated && !isProcessing && (
            <div className="row mb-4">
              <div className="col-12">
                <div className="card border-0 shadow-sm">
                  <div className="card-body p-4">
                    <div className="text-center">
                      <audio controls className="w-100 mb-3" key={generatedAudioUrl}>
                        <source src={generatedAudioUrl} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>

                      <div className="d-flex justify-content-center align-items-center gap-3 text-muted mb-3">
                        <small>
                          <i className="fas fa-clock me-1"></i> Duration: {audioInfo.duration}
                        </small>
                        <small>
                          <i className="fas fa-file-audio me-1"></i> Format: MP3
                        </small>
                        <small>
                          <i className="fas fa-compress me-1"></i> Size: {audioInfo.fileSize}
                        </small>
                      </div>

                      <button className="btn btn-success btn-lg px-4" onClick={handleDownloadAudio}>
                        <i className="fas fa-download me-2"></i>
                        Download Audio
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Instructions */}
          {!selectedFile && (
            <div className="row">
              <div className="col-12">
                <div className="card border-primary border-2">
                  <div className="card-body p-4">
                    <h6 className="card-title text-primary mb-3">
                      <i className="fas fa-info-circle me-2"></i>
                      How to Use
                    </h6>
                    <div className="row">
                      <div className="col-md-6">
                        <ol className="mb-0">
                          <li className="mb-2">Upload your document (.txt, .pdf, or .docx)</li>
                          <li className="mb-2">Wait for automatic language detection</li>
                          <li className="mb-2">Click "Convert to Speech" button</li>
                        </ol>
                      </div>
                      <div className="col-md-6">
                        <ol className="mb-0" start={4}>
                          <li className="mb-2">Listen to the generated audio</li>
                          <li className="mb-2">Download your audio file</li>
                          <li className="mb-2">Use it for educational purposes</li>
                        </ol>
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
