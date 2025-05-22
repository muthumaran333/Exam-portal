import CountUp from 'react-countup';
import React from 'react';
import { FaUsers, FaChalkboardTeacher, FaClipboardList } from 'react-icons/fa';

const stats = [
  { value: 1200, label: 'Students Enrolled', icon: <FaUsers /> },
  { value: 85, label: 'Exams Conducted', icon: <FaClipboardList /> },
  { value: 40, label: 'Verified Instructors', icon: <FaChalkboardTeacher /> },
];

export default function StatsSection() {
  return (
<section
  className="py-24 bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50"
  id="features"
  aria-label="Key statistics"
>
  <div className="max-w-7xl mx-auto px-6 text-center">
    <h2
      className="text-5xl font-extrabold text-indigo-900 mb-20 tracking-wide drop-shadow-[0_4px_8px_rgba(67,56,202,0.3)]"
      data-aos="fade-down"
    >
      Platform Key Stats
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
      {stats.map((item, i) => (
        <div
          key={i}
          className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-indigo-400/40 transition-shadow duration-500 transform hover:-translate-y-2 focus:outline-none focus:ring-4 focus:ring-indigo-300"
          data-aos="zoom-in"
          tabIndex={0}
          aria-label={`${item.label}: ${item.value}+`}
        >
          <div className="text-indigo-600 text-5xl mb-5 drop-shadow-md">{item.icon}</div>
          <h4 className="text-6xl font-extrabold text-indigo-800 tracking-tight">
            <CountUp end={item.value} duration={2} />+
          </h4>
          <p className="text-indigo-700 mt-4 text-xl font-medium">{item.label}</p>
        </div>
      ))}
    </div>
  </div>
</section>

  );
}
