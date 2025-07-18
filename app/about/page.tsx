"use client"

import { useEffect, useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function AboutPage() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const team = [
    {
      name: "Qadeer Qureshi",
      role: "Concept, architecture, planning",
      image: "/boy.jpg?height=200&width=200",
      // bio: "........................................",
    },
    {
      name: "Muhammad Ehtisham",
      role: "Research, APIs, backend, integration",
      image: "/boy.jpg?height=200&width=200",
      // bio: "........................................",
    },
    {
      name: "Aqsa Mahmood",
      role: "Front end design, integration",
      image: "/girl.jpg?height=200&width=200",
      // bio: "........................................",
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
              <div className="row align-items-center">
                <div className="col-lg-6 text-white">
                  <h1 className="display-4 fw-bold mb-4">About <span className="text-warning"> EduAI Pro </span></h1>
                  <p className="lead mb-4">
                    We're on a mission to democratize quality education through AI technology, making it easier for
                    educators to create engaging content that reaches learners worldwide.
                  </p>
                </div>
                <div className="col-lg-6">
                  <img src="/about.jpg?height=400&width=500" alt="About Us" className="img-fluid rounded-3" />
                </div>
              </div>
            </div>
          </section>

          {/* Mission Section */}
          <section className="py-5">
            <div className="container">
              <div className="row">
                <div className="col-lg-8 mx-auto text-center">
                  <h2 className="display-5 fw-bold mb-4">Our Mission</h2>
                  <p className="lead text-muted mb-5">
                    To empower educators worldwide with cutting-edge AI tools that make creating high-quality
                    educational content faster, easier, and more accessible than ever before.
                  </p>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-4 mb-4">
                  <div className="text-center">
                    <div
                      className="bg-primary bg-gradient text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                      style={{ width: "80px", height: "80px" }}
                    >
                      <i className="fas fa-lightbulb fs-3"></i>
                    </div>
                    <h5 className="fw-bold mb-3">Innovation</h5>
                    <p className="text-muted">
                      We continuously push the boundaries of what's possible with AI in education
                    </p>
                  </div>
                </div>
                <div className="col-lg-4 mb-4">
                  <div className="text-center">
                    <div
                      className="bg-success bg-gradient text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                      style={{ width: "80px", height: "80px" }}
                    >
                      <i className="fas fa-users fs-3"></i>
                    </div>
                    <h5 className="fw-bold mb-3">Accessibility</h5>
                    <p className="text-muted">
                      Making quality educational tools available to educators regardless of budget or location
                    </p>
                  </div>
                </div>
                <div className="col-lg-4 mb-4">
                  <div className="text-center">
                    <div
                      className="bg-warning bg-gradient text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                      style={{ width: "80px", height: "80px" }}
                    >
                      <i className="fas fa-heart fs-3"></i>
                    </div>
                    <h5 className="fw-bold mb-3">Impact</h5>
                    <p className="text-muted">
                      Creating meaningful change in how educational content is created and consumed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Story Section */}
          <section className="py-5 bg-light">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-6 mb-4 mb-lg-0">
                  <img src="/ourStory.jpg?height=400&width=500" alt="Our Story" className="img-fluid rounded-3" />
                </div>
                <div className="col-lg-6">
                  <h2 className="display-6 fw-bold mb-4">Our Story</h2>
                  <p className="text-muted mb-4">
                    Founded in 2023 by a team of AI researchers and education experts, EduAI Pro was born from the
                    frustration of seeing talented educators struggle with time-consuming content creation.
                  </p>
                  <p className="text-muted mb-4">
                    We witnessed firsthand how teachers and professors spent countless hours writing scripts, creating
                    audio content, and translating materials for diverse student populations. We knew AI could solve
                    these challenges.
                  </p>
                  <p className="text-muted mb-4">
                    Today, we're proud to serve over 10,000 educators across 50+ countries, helping them create engaging
                    educational content in minutes instead of hours.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section className="py-5">
            <div className="container">
              <div className="text-center mb-5">
                <h2 className="display-5 fw-bold mb-3">Meet Our Team</h2>
                <p className="lead text-muted">The brilliant minds behind EduAI Pro</p>
              </div>

              <div className="row justify-content-center">
                {team.map((member, index) => (
                  <div key={index} className="col-lg-4 col-md-6 mb-4">
                    <div className="card border-0 shadow-sm text-center h-100">
                      <div className="card-body p-4">
                        <img
                          src={member.image || "/placeholder.svg"}
                          alt={member.name}
                          className="rounded-circle mb-3"
                          width="120"
                          height="120"
                        />
                        <h5 className="fw-bold mb-1">{member.name}</h5>
                        <p className="text-primary fw-medium mb-3">{member.role}</p>
                        {/* <p className="text-muted small">{member.bio}</p> */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="py-5 bg-primary text-white">
            <div className="container">
              <div className="text-center mb-5">
                <h2 className="display-5 fw-bold mb-3">Our Values</h2>
                <p className="lead opacity-75">The principles that guide everything we do</p>
              </div>

              <div className="row">
                <div className="col-lg-3 col-md-6 mb-4">
                  <div className="text-center">
                    <i className="fas fa-shield-alt fs-1 mb-3 text-warning"></i>
                    <h5 className="fw-bold mb-3">Privacy First</h5>
                    <p className="opacity-75">Your data and content are always secure and private</p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 mb-4">
                  <div className="text-center">
                    <i className="fas fa-rocket fs-1 mb-3 text-warning"></i>
                    <h5 className="fw-bold mb-3">Innovation</h5>
                    <p className="opacity-75">Constantly improving and adding new features</p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 mb-4">
                  <div className="text-center">
                    <i className="fas fa-handshake fs-1 mb-3 text-warning"></i>
                    <h5 className="fw-bold mb-3">Partnership</h5>
                    <p className="opacity-75">Working closely with educators to understand their needs</p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 mb-4">
                  <div className="text-center">
                    <i className="fas fa-globe fs-1 mb-3 text-warning"></i>
                    <h5 className="fw-bold mb-3">Global Impact</h5>
                    <p className="opacity-75">Making quality education accessible worldwide</p>
                  </div>
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
