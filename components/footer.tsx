"use client"

import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-dark text-light py-5 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 mb-4">
            <div className="d-flex align-items-center mb-3">
              <i className="fas fa-graduation-cap text-primary fs-2 me-2"></i>
              <div>
                <h5 className="mb-0 text-primary">EduAI Pro</h5>
                <small className="text-light">AI-Powered Education</small>
              </div>
            </div>
            <p className="text-light">
              Transform your educational content with cutting-edge AI technology. Create engaging scripts and convert
              text to speech with ease.
            </p>
            <div className="d-flex gap-3">
              <a href="#" className="text-light fs-5" aria-label="Facebook">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="text-light fs-5" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-light fs-5" aria-label="LinkedIn">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#" className="text-light fs-5" aria-label="YouTube">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>

          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="text-primary mb-3">Product</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link href="/features" className="text-light text-decoration-none">
                  Features
                </Link>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">
                  API
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">
                  Documentation
                </a>
              </li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="text-primary mb-3">Tools</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link href="/script-generator" className="text-light text-decoration-none">
                  Script Generator
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/text-to-speech" className="text-light text-decoration-none">
                  Text-to-Speech
                </Link>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">
                  Language Detection
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">
                  Voice Cloning
                </a>
              </li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="text-primary mb-3">Company</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link href="/about" className="text-light text-decoration-none">
                  About Us
                </Link>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">
                  Careers
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="text-primary mb-3">Support</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="mailto:support@eduaipro.com" className="text-light text-decoration-none">
                  support@eduaipro.com
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">
                  Privacy Policy
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">
                  Terms of Service
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">
                  Status
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-4 border-secondary" />

        <div className="row align-items-center">
          <div className="col-md-6">
            <p className="text-light mb-0">© 2024 EduAI Pro. All rights reserved.</p>
          </div>
          <div className="col-md-6 text-md-end">
            <p className="text-light mb-0">
              Made with <i className="fas fa-heart text-danger"></i> for educators worldwide
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
