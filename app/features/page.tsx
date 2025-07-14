"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function FeaturesPage() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const features = [
    {
      icon: "fas fa-robot",
      title: "AI-Powered Script Generation",
      description: "Generate comprehensive educational scripts using advanced GPT technology",
      benefits: [
        "Topic-specific content creation",
        "Customizable duration (1-30 minutes)",
        "Engaging and educational format",
        "Professional quality output",
      ],
    },
    {
      icon: "fas fa-language",
      title: "Multi-Language Translation",
      description: "Translate your scripts into 9+ languages with high accuracy",
      benefits: [
        "Chinese (Simplified & Traditional)",
        "Spanish, French, German, Italian",
        "Turkish, Russian, Japanese",
        "Maintain context and meaning",
      ],
    },
    {
      icon: "fas fa-microphone-alt",
      title: "Text-to-Speech Conversion",
      description: "Convert any text document to natural-sounding audio",
      benefits: [
        "Multiple voice options",
        "Adjustable speed and pitch",
        "High-quality audio output",
        "Batch processing support",
      ],
    },
    {
      icon: "fas fa-search",
      title: "Language Detection",
      description: "Automatically detect the language of uploaded documents",
      benefits: ["99%+ accuracy rate", "Support for 50+ languages", "Instant detection", "Confidence scoring"],
    },
    {
      icon: "fas fa-file-upload",
      title: "Document Processing",
      description: "Upload and process various document formats seamlessly",
      benefits: ["PDF, DOCX, TXT support", "Batch file processing", "Text extraction", "Format preservation"],
    },
    {
      icon: "fas fa-download",
      title: "Easy Export Options",
      description: "Download your content in multiple formats for any use case",
      benefits: [
        "Script downloads (TXT, PDF)",
        "Audio files (MP3, WAV)",
        "Subtitle files (SRT)",
        "Bulk export options",
      ],
    },
  ]

  if (!isMounted) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1">
        <div>
          {/* Hero Section */}
          <section className="bg-gradient-primary py-5">
            <div className="container py-5">
              <div className="text-center text-white">
                <h1 className="display-4 fw-bold mb-4">Powerful Features</h1>
                <p className="lead mb-4">Discover all the tools you need to create amazing educational content</p>
                <Link href="/script-generator" className="btn btn-warning btn-lg px-4">
                  <i className="fas fa-rocket me-2"></i>
                  Try It Now
                </Link>
              </div>
            </div>
          </section>

          {/* Features Grid */}
          <section className="py-5">
            <div className="container">
              <div className="row">
                {features.map((feature, index) => (
                  <div key={index} className="col-lg-4 col-md-6 mb-5">
                    <div className="card border-0 shadow-sm h-100">
                      <div className="card-body p-4">
                        <div className="d-flex align-items-center mb-3">
                          <div className="feature-icon bg-primary bg-gradient text-white rounded-circle d-flex align-items-center justify-content-center me-3">
                            <i className={`${feature.icon} fs-5`}></i>
                          </div>
                          <h5 className="fw-bold mb-0">{feature.title}</h5>
                        </div>
                        <p className="text-muted mb-3">{feature.description}</p>
                        <ul className="list-unstyled">
                          {feature.benefits.map((benefit, idx) => (
                            <li key={idx} className="mb-2">
                              <i className="fas fa-check text-success me-2"></i>
                              <small>{benefit}</small>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-5 bg-primary text-white">
            <div className="container">
              <div className="text-center">
                <h3 className="fw-bold mb-3">Ready to Experience These Features?</h3>
                <p className="lead mb-4 opacity-75">
                  Start creating amazing educational content today with our powerful AI tools
                </p>
                <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                  <Link href="/script-generator" className="btn btn-warning btn-lg px-4">
                    <i className="fas fa-rocket me-2"></i>
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
