"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function HomePage() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const features = [
    {
      icon: "fas fa-robot",
      title: "AI Script Generation",
      description: "Create engaging educational scripts in minutes using advanced AI technology",
    },
    {
      icon: "fas fa-language",
      title: "Multi-Language Support",
      description: "Generate and translate content in 9+ languages including Chinese, Spanish, and more",
    },
    {
      icon: "fas fa-microphone-alt",
      title: "Text-to-Speech",
      description: "Convert your scripts to natural-sounding audio with customizable voice options",
    },
    {
      icon: "fas fa-file-upload",
      title: "Document Processing",
      description: "Upload PDF, DOCX, or TXT files and automatically convert them to audio",
    },
    {
      icon: "fas fa-download",
      title: "Easy Export",
      description: "Download your scripts and audio files in various formats for any platform",
    },
    {
      icon: "fas fa-mobile-alt",
      title: "Responsive Design",
      description: "Access your tools from any device with our fully responsive interface",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "High School Teacher",
      image: "/placeholder.svg?height=80&width=80",
      text: "EduAI Pro has revolutionized how I create educational content. My students are more engaged than ever!",
    },
    {
      name: "Dr. Michael Chen",
      role: "University Professor",
      image: "/placeholder.svg?height=80&width=80",
      text: "The multi-language support is incredible. I can now reach students from diverse backgrounds effortlessly.",
    },
    {
      name: "Emily Rodriguez",
      role: "Online Course Creator",
      image: "/placeholder.svg?height=80&width=80",
      text: "The text-to-speech feature saves me hours of recording. The quality is absolutely professional.",
    },
  ]

  if (!isClient) {
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
              <div className="row align-items-center">
                <div className="col-lg-6 mb-5 mb-lg-0">
                  <div className="text-center text-lg-start">
                    <h1 className="display-4 fw-bold text-white mb-4">
                      <span className="text-warning"> AI-Powered </span>
                      Educational Tool
                    </h1>
                    <p className="lead text-white-50 mb-4">
                      Create engaging educational scripts and convert text to speech in minutes. Support for 9+
                      languages and professional-quality audio output.
                    </p>
                    <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start">
                      <Link href="/script-generator" className="btn btn-warning btn-lg px-4">
                        <i className="fas fa-rocket me-2"></i>
                        Start Creating
                      </Link>
                      <Link href="/features" className="btn btn-outline-light btn-lg px-4">
                        <i className="fas fa-play me-2"></i>
                        Learn More
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="text-center">
                    <img
                      src="/home.jpg?height=400&width=500"
                      alt="AI Education Platform"
                      className="img-fluid rounded-3 shadow-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-5 bg-light">
            <div className="container">
              <div className="row text-center">
                <div className="col-md-3 mb-4">
                  <div className="h2 fw-bold text-primary mb-2">10K+</div>
                  <p className="text-muted mb-0">Scripts Generated</p>
                </div>
                <div className="col-md-3 mb-4">
                  <div className="h2 fw-bold text-primary mb-2">50+</div>
                  <p className="text-muted mb-0">Countries Served</p>
                </div>
                <div className="col-md-3 mb-4">
                  <div className="h2 fw-bold text-primary mb-2">9</div>
                  <p className="text-muted mb-0">Languages Supported</p>
                </div>
                <div className="col-md-3 mb-4">
                  <div className="h2 fw-bold text-primary mb-2">99.9%</div>
                  <p className="text-muted mb-0">Uptime</p>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-5">
            <div className="container">
              <div className="text-center mb-5">
                <h2 className="display-5 fw-bold mb-3">Powerful Features</h2>
                <p className="lead text-muted">Everything you need to create amazing educational content</p>
              </div>

              <div className="row">
                {features.map((feature, index) => (
                  <div key={index} className="col-lg-4 col-md-6 mb-4">
                    <div className="card h-100 border-0 shadow-sm hover-lift">
                      <div className="card-body text-center p-4">
                        <div className="feature-icon bg-primary bg-gradient text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3">
                          <i className={`${feature.icon} fs-4`}></i>
                        </div>
                        <h5 className="card-title fw-bold mb-3">{feature.title}</h5>
                        <p className="card-text text-muted">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section className="py-5 bg-light">
            <div className="container">
              <div className="text-center mb-5">
                <h2 className="display-5 fw-bold mb-3">How It Works</h2>
                <p className="lead text-muted">Get started in just 3 simple steps</p>
              </div>

              <div className="row">
                <div className="col-lg-4 mb-4">
                  <div className="text-center">
                    <div className="step-number bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3">
                      1
                    </div>
                    <h5 className="fw-bold mb-3">Enter Your Topic</h5>
                    <p className="text-muted">Simply type in your educational topic and select the desired duration</p>
                  </div>
                </div>
                <div className="col-lg-4 mb-4">
                  <div className="text-center">
                    <div className="step-number bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3">
                      2
                    </div>
                    <h5 className="fw-bold mb-3">AI Generates Script</h5>
                    <p className="text-muted">Our AI creates a comprehensive, engaging script tailored to your needs</p>
                  </div>
                </div>
                <div className="col-lg-4 mb-4">
                  <div className="text-center">
                    <div className="step-number bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3">
                      3
                    </div>
                    <h5 className="fw-bold mb-3">Download & Use</h5>
                    <p className="text-muted">Export your script or convert it to audio in multiple languages</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          
          {/* CTA Section */}
          <section className="py-5 bg-primary text-white">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-8 text-center text-lg-start mb-4 mb-lg-0">
                  <h3 className="fw-bold mb-2">Ready to Transform Your Educational Content?</h3>
                  <p className="mb-0 opacity-75">Join thousands of educators who are already using EduAI Pro</p>
                </div>
                <div className="col-lg-4 text-center text-lg-end">
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
