import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import Lottie from "lottie-react";

export default function HeroSection() {
  const [animationData, setAnimationData] = useState(null);

  const graduationCapURL =
    "https://assets9.lottiefiles.com/packages/lf20_puciaact.json";

  useEffect(() => {
    fetch(graduationCapURL)
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => {
        console.error("Failed to load Lottie animation:", err);
      });
  }, []);

  // Generate random stars data (20 stars)
  const stars = Array.from({ length: 20 }).map(() => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: `${Math.random() * 2 + 1}px`, // between 1px and 3px
    delay: `${Math.random() * 5}s`,
    duration: `${2 + Math.random() * 3}s`,
    opacity: 0.6 + Math.random() * 0.4,
  }));

  return (
    <section
      className="relative text-center py-32 px-6 bg-gradient-to-br from-indigo-900 via-blue-800 to-purple-900 text-white overflow-hidden"
      aria-label="Hero section"
    >
      {/* Artistic soft glowing circles */}
      <div
        aria-hidden="true"
        className="absolute -top-20 -left-20 w-96 h-96 bg-purple-700 rounded-full opacity-40 filter blur-3xl animate-pulse"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-10 right-10 w-72 h-72 bg-blue-600 rounded-full opacity-30 filter blur-2xl animate-pulse animation-delay-1000"
      />
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 w-80 h-80 bg-indigo-700 rounded-full opacity-20 filter blur-xl -translate-x-1/2 -translate-y-1/2"
      />

      {/* Floating drifting shapes */}
      <div aria-hidden="true">
        <span className="absolute top-10 left-10 w-6 h-6 bg-yellow-400 rounded-full opacity-70 animate-drift1" />
        <span className="absolute top-20 right-20 w-4 h-4 bg-pink-500 rounded-full opacity-80 animate-drift2" />
        <span className="absolute bottom-20 left-24 w-5 h-5 bg-teal-400 opacity-60 animate-drift3" />
        <span
          className="absolute bottom-10 right-28 w-0 h-0 border-l-6 border-r-6 border-b-10 border-transparent opacity-70 animate-drift4"
          style={{ borderBottomColor: "rgba(139, 92, 246, 0.7)" }}
        />

        {/* Additional drifting shapes */}
        <span className="absolute top-1/3 left-1/4 w-3 h-3 bg-green-300 rounded-full opacity-60 animate-drift5" />
        <span className="absolute bottom-1/4 right-1/3 w-7 h-7 bg-red-400 rounded-full opacity-50 animate-drift6" />
        <span
          className="absolute top-3/4 left-1/5 w-0 h-0 border-l-5 border-r-5 border-b-8 border-transparent opacity-60 animate-drift7"
          style={{ borderBottomColor: "rgba(255, 193, 7, 0.7)" }}
        />
        <span className="absolute bottom-1/3 right-1/5 w-4 h-4 bg-cyan-400 rounded-full opacity-55 animate-drift8" />
      </div>

      {/* Twinkling stars */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        {stars.map(({ top, left, size, delay, duration, opacity }, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              top,
              left,
              width: size,
              height: size,
              opacity,
              filter: "drop-shadow(0 0 4px white)",
              animation: `twinkle ${duration} ease-in-out infinite`,
              animationDelay: delay,
            }}
          />
        ))}
      </div>

      {/* Graduation cap Lottie animation */}
      <div
        aria-hidden="true"
        className="absolute top-10 right-10 w-40 h-40 opacity-80 animate-floatSlow z-0 pointer-events-none select-none"
      >
        {animationData && <Lottie animationData={animationData} loop={true} />}
      </div>

      {/* Content container */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <h2 className="text-6xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.45)]">
          Empowering{" "}
          <span className="text-yellow-400 animate-pulse">Digital</span>{" "}
          Examinations
        </h2>

        <p className="text-2xl md:text-3xl max-w-3xl mx-auto mb-12 opacity-90 tracking-wide drop-shadow-md">
          Secure, flexible, and powerful tools for managing exams online.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link
            to="/login"
            className="bg-white/90 backdrop-blur-sm text-blue-900 hover:bg-white shadow-lg font-bold py-4 px-10 rounded-full flex items-center gap-4 transition duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            <FaSignInAlt aria-hidden="true" className="text-2xl" />
            <span>Login</span>
          </Link>

          <Link
            to="/register"
            className="bg-yellow-400 hover:bg-yellow-500 shadow-lg text-white font-bold py-4 px-10 rounded-full flex items-center gap-4 transition duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-yellow-300"
          >
            <FaUserPlus aria-hidden="true" className="text-2xl" />
            <span>Register</span>
          </Link>
        </div>
      </div>

      {/* Custom animations for floating, drifting, and twinkle */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes floatReverse {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }

        /* Drifting animations for shapes */
        @keyframes drift1 {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(10px, -10px); }
          50% { transform: translate(20px, 5px); }
          75% { transform: translate(5px, 10px); }
        }
        @keyframes drift2 {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(-8px, 10px); }
          50% { transform: translate(-15px, 5px); }
          75% { transform: translate(-10px, -5px); }
        }
        @keyframes drift3 {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(12px, 12px); }
          50% { transform: translate(15px, 8px); }
          75% { transform: translate(5px, 15px); }
        }
        @keyframes drift4 {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(-10px, -10px); }
          50% { transform: translate(-20px, -5px); }
          75% { transform: translate(-5px, -15px); }
        }
        @keyframes drift5 {
          0%, 100% { transform: translate(0, 0); }
          30% { transform: translate(8px, 7px); }
          60% { transform: translate(15px, 12px); }
          90% { transform: translate(5px, 5px); }
        }
        @keyframes drift6 {
          0%, 100% { transform: translate(0, 0); }
          20% { transform: translate(-12px, 8px); }
          50% { transform: translate(-20px, 15px); }
          80% { transform: translate(-5px, 10px); }
        }
        @keyframes drift7 {
          0%, 100% { transform: translate(0, 0); }
          30% { transform: translate(10px, -8px); }
          60% { transform: translate(20px, -12px); }
          90% { transform: translate(7px, -5px); }
        }
        @keyframes drift8 {
          0%, 100% { transform: translate(0, 0); }
          30% { transform: translate(-7px, 10px); }
          60% { transform: translate(-15px, 18px); }
          90% { transform: translate(-5px, 8px); }
        }

        /* Twinkle animation for stars */
        @keyframes twinkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.3); }
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-floatSlow {
          animation: floatSlow 6s ease-in-out infinite;
        }
        .animate-floatReverse {
          animation: floatReverse 5s ease-in-out infinite;
        }

        .animate-drift1 {
          animation: drift1 10s ease-in-out infinite;
        }
        .animate-drift2 {
          animation: drift2 12s ease-in-out infinite;
        }
        .animate-drift3 {
          animation: drift3 9s ease-in-out infinite;
        }
        .animate-drift4 {
          animation: drift4 11s ease-in-out infinite;
        }
        .animate-drift5 {
          animation: drift5 10s ease-in-out infinite;
        }
        .animate-drift6 {
          animation: drift6 13s ease-in-out infinite;
        }
        .animate-drift7 {
          animation: drift7 14s ease-in-out infinite;
        }
        .animate-drift8 {
          animation: drift8 15s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
