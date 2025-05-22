import React from 'react';
import { FaFileAlt, FaChartBar, FaLock } from 'react-icons/fa';

const features = [
  {
    icon: <FaFileAlt className="text-blue-600 text-5xl mx-auto mb-6" aria-hidden="true" />,
    title: 'Smart Test Management',
    description:
      'Craft dynamic tests with time limits, schedules, and multiple question types.',
  },
  {
    icon: <FaChartBar className="text-green-600 text-5xl mx-auto mb-6" aria-hidden="true" />,
    title: 'Advanced Analytics',
    description:
      'Get real-time results, dashboards, and insights into progress.',
  },
  {
    icon: <FaLock className="text-purple-600 text-5xl mx-auto mb-6" aria-hidden="true" />,
    title: 'Robust Security',
    description:
      'Ensure safety with encryption, role-based access, and authentication.',
  },
];

const Features = () => {
  return (
<section
  className="py-24 bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50"
  id="features"
  aria-label="Platform features"
>
  <div className="max-w-7xl mx-auto px-6">
    <h2
      className="text-5xl font-extrabold text-center text-indigo-900 mb-20 tracking-wide drop-shadow-[0_4px_8px_rgba(67,56,202,0.3)]"
      data-aos="fade-down"
    >
      Why Choose ExamPortal?
    </h2>

    <div className="grid md:grid-cols-3 gap-12">
      {features.map((feature, index) => (
        <div
          key={index}
          className="bg-white shadow-xl rounded-3xl p-10 text-center border border-gray-100 hover:shadow-indigo-400/40 transition-shadow duration-500 transform hover:-translate-y-2 focus:outline-none focus:ring-4 focus:ring-indigo-300"
          data-aos="zoom-in"
          data-aos-delay={index * 100}
          tabIndex={0}
        >
          {React.cloneElement(feature.icon, {
            className:
              feature.icon.props.className.replace(
                /text-[a-z]+-[600]/,
                (match) => match.replace(/600/, "700")
              ) + " drop-shadow-md text-center mx-auto mb-6 text-6xl",
            "aria-hidden": true,
          })}
          <h4 className="font-semibold text-2xl text-indigo-900 mb-4">
            {feature.title}
          </h4>
          <p className="text-indigo-700 text-lg">{feature.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>

  );
};

export default Features;
