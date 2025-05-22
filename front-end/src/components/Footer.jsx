import React from 'react';
import { FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer
      className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-12 px-6"
      aria-label="Footer"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-8 md:gap-0">
        
        {/* Brand & Copyright */}
        <div className="text-center md:text-left max-w-xs">
          <h4 className="text-2xl font-extrabold mb-2 tracking-wide">ExamPortal</h4>
          <p className="text-sm text-blue-300 select-none">
            © {new Date().getFullYear()} ExamPortal. All rights reserved.
          </p>
        </div>

        {/* Navigation Links */}
        <nav
          aria-label="Footer Navigation"
          className="hidden md:flex space-x-8 text-sm text-blue-300 font-medium"
        >
          <a href="#features" className="hover:text-white transition">Features</a>
          <a href="#pricing" className="hover:text-white transition">Pricing</a>
          <a href="#team" className="hover:text-white transition">Team</a>
          <a href="#contact" className="hover:text-white transition">Contact</a>
        </nav>

        {/* Social Media Icons */}
        <nav aria-label="Social media" className="flex space-x-6 text-2xl">
          <a
            href="https://linkedin.com/company/examportal"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-blue-400 transition"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://twitter.com/examportal"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="hover:text-blue-400 transition"
          >
            <FaTwitter />
          </a>
          <a
            href="mailto:support@examportal.com"
            aria-label="Email"
            className="hover:text-blue-400 transition"
          >
            <FaEnvelope />
          </a>
        </nav>
      </div>

      {/* Inline style tag - no `jsx` prop */}
      <style>{`
        footer {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </footer>
  );
};

export default Footer;
