import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setModalOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Exam details submitted!");
    setModalOpen(false);
  };

  return (
    <>
      <header className="bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 shadow-lg sticky top-0 z-50 rounded-b-sm border-b border-blue-700">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <h1 className="text-4xl font-extrabold text-white tracking-tight drop-shadow-lg cursor-default select-none">
            ExamPortal
          </h1>
          <nav className="flex gap-8 text-lg font-medium" aria-label="Primary navigation">
            <Link
              to="/"
              className="text-white hover:text-yellow-300 transition-colors duration-300"
            >
              Home
            </Link>
            <Link
              to="/login"
              className="text-white hover:text-blue-300 transition-colors duration-300"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-white hover:text-green-300 transition-colors duration-300"
            >
              Register
            </Link>
            <button
              onClick={() => setModalOpen(true)}
              className="text-white hover:text-purple-300 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 rounded-md"
              aria-haspopup="dialog"
              aria-expanded={isModalOpen}
              aria-controls="contact-modal"
            >
              Contact
            </button>
          </nav>
        </div>
      </header>

      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          id="contact-modal"
          className="fixed inset-0 z-60 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm px-4"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full p-8 relative shadow-2xl border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalOpen(false)}
              aria-label="Close contact form"
              className="absolute top-5 right-5 text-gray-500 hover:text-gray-900 transition-colors focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-3xl font-bold mb-6 text-purple-700 text-center">
              Contact ExamPortal
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <label className="block">
                <span className="text-gray-800 font-semibold mb-1 block">Your Name</span>
                <input
                  type="text"
                  name="name"
                  required
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-300 transition"
                  placeholder="John Doe"
                />
              </label>

              <label className="block">
                <span className="text-gray-800 font-semibold mb-1 block">Email Address</span>
                <input
                  type="email"
                  name="email"
                  required
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-300 transition"
                  placeholder="john@example.com"
                />
              </label>

              <label className="block">
                <span className="text-gray-800 font-semibold mb-1 block">Exam Details</span>
                <textarea
                  name="examDetails"
                  rows="5"
                  required
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-300 transition resize-none"
                  placeholder="Please provide your exam details here..."
                ></textarea>
              </label>

              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 rounded-lg shadow-md transition-transform active:scale-95"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
