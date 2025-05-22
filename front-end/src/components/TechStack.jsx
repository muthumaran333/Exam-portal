import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import {
  FaReact,
  FaJsSquare,
  FaHtml5,
  FaCss3Alt,
  FaNodeJs,
  FaPython,
  FaJava,
  FaGithub,
} from 'react-icons/fa';
import { SiExpress, SiMongodb, SiPostgresql, SiVercel } from 'react-icons/si';

const techStack = [
  {
    title: 'Frontend',
    description:
      'We use modern frontend libraries and frameworks for fast, interactive, and scalable interfaces.',
    color: 'text-indigo-800',
    borderColor: 'border-indigo-300',
    iconColor: 'text-indigo-700',
    icons: [
      { icon: <FaReact />, name: 'React', hover: 'hover:text-indigo-400' },
      { icon: <FaJsSquare />, name: 'JavaScript', hover: 'hover:text-yellow-400' },
      { icon: <FaHtml5 />, name: 'HTML5', hover: 'hover:text-orange-500' },
      { icon: <FaCss3Alt />, name: 'CSS3', hover: 'hover:text-blue-500' },
    ],
  },
  {
    title: 'Backend',
    description:
      'Our backend is powered by robust, scalable, and efficient technologies to ensure high performance.',
    color: 'text-green-800',
    borderColor: 'border-green-300',
    iconColor: 'text-green-700',
    icons: [
      { icon: <FaNodeJs />, name: 'Node.js', hover: 'hover:text-green-400' },
      { icon: <SiExpress />, name: 'Express.js', hover: 'hover:text-gray-600' },
      { icon: <FaPython />, name: 'Python', hover: 'hover:text-blue-500' },
      { icon: <FaJava />, name: 'Java', hover: 'hover:text-red-500' },
    ],
  },
  {
    title: 'Tools & Platforms',
    description:
      'From version control to deployment, we leverage powerful tools that simplify DevOps and collaboration.',
    color: 'text-gray-800',
    borderColor: 'border-gray-300',
    iconColor: 'text-gray-700',
    icons: [
      { icon: <FaGithub />, name: 'GitHub', hover: 'hover:text-black' },
      { icon: <SiMongodb />, name: 'MongoDB', hover: 'hover:text-green-600' },
      { icon: <SiPostgresql />, name: 'PostgreSQL', hover: 'hover:text-blue-700' },
      { icon: <SiVercel />, name: 'Vercel', hover: 'hover:text-black' },
    ],
  },
];

const TechStack = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section
      className="py-24 bg-gradient-to-br from-indigo-100 via-white to-indigo-50"
      id="tech-stack"
      aria-label="Technology Stack"
    >
      <div className="max-w-6xl mx-auto px-6">
        <h2
          className="text-5xl font-extrabold text-center text-indigo-900 mb-20 tracking-wide drop-shadow-md"
          data-aos="fade-down"
        >
          Our Technology Stack
        </h2>

        <div className="grid md:grid-cols-3 gap-14">
          {techStack.map((section, index) => (
            <div
              key={index}
              className={`bg-white/30 backdrop-blur-md ${section.borderColor} border rounded-2xl p-10 shadow-xl hover:shadow-2xl transition-shadow duration-500 flex flex-col items-center overflow-hidden`}
              data-aos="flip-left"
              data-aos-delay={index * 200}
            >
              <h3 className={`text-2xl font-semibold mb-4 text-center tracking-wide ${section.color}`}>
                {section.title}
              </h3>
              <p className="text-center text-gray-600 mb-8 text-sm leading-relaxed px-2">
                {section.description}
              </p>

              <div
                className={`flex flex-wrap justify-center gap-10 text-5xl md:text-6xl ${section.iconColor}`}
              >
                {section.icons.map((tech, i) => (
                  <div
                    key={i}
                    className="transition-transform duration-300 transform hover:scale-110 animate-float"
                    title={tech.name}
                  >
                    <div className={`${tech.hover}`}>{tech.icon}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating animation keyframes */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default TechStack;
