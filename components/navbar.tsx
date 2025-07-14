"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const isActive = (path: string) => {
    if (!isMounted) return false
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  // Close mobile menu when route changes
  useEffect(() => {
    if (isMounted) {
      setIsOpen(false)
      setIsDropdownOpen(false)
    }
  }, [pathname, isMounted])

  if (!isMounted) {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
        <div className="container">
          <Link className="navbar-brand fw-bold fs-3" href="/">
            <i className="fas fa-graduation-cap text-primary me-2"></i>
            <span className="text-primary">EduAI</span>
            <span className="text-secondary">Pro</span>
          </Link>
        </div>
      </nav>
    )
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-3" href="/">
          <i className="fas fa-graduation-cap text-primary me-2"></i>
          <span className="text-primary">EduAI</span>
          <span className="text-secondary">Pro</span>
        </Link>

        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link className={`nav-link fw-medium ${isActive("/") ? "text-primary" : "text-dark"}`} href="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link fw-medium ${isActive("/about") ? "text-primary" : "text-dark"}`} href="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link fw-medium ${isActive("/features") ? "text-primary" : "text-dark"}`}
                href="/features"
              >
                Features
              </Link>
            </li>
            <li className={`nav-item dropdown ${isDropdownOpen ? "show" : ""}`}>
              <button
                className="nav-link dropdown-toggle fw-medium text-dark bg-transparent border-0"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                aria-expanded={isDropdownOpen}
              >
                Tools
              </button>
              <ul className={`dropdown-menu shadow-sm border-0 ${isDropdownOpen ? "show" : ""}`}>
                <li>
                  <Link className="dropdown-item" href="/script-generator">
                    <i className="fas fa-file-alt me-2 text-primary"></i>
                    Script Generator
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" href="/text-to-speech">
                    <i className="fas fa-microphone me-2 text-primary"></i>
                    Text-to-Speech
                  </Link>
                </li>
              </ul>
            </li>
          </ul>

          <div className="d-flex gap-2">
            <button className="btn btn-outline-primary">Sign In</button>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
    </nav>
  )
}
