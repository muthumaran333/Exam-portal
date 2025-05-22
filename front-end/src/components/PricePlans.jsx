import React from 'react';
import { Link } from 'react-router-dom';

const PricingPlans = () => {
  const plans = [
    {
      title: 'Basic',
      description: 'For individuals and small teams starting out.',
      price: '$9.99',
      features: ['Up to 50 exams', 'Basic analytics', 'Email support'],
      link: '/register',
      buttonText: 'Get Started',
      isFeatured: false,
    },
    {
      title: 'Pro',
      description: 'For growing teams and professional use.',
      price: '$29.99',
      features: ['Unlimited exams', 'Advanced analytics', 'Priority support'],
      link: '/register',
      buttonText: 'Upgrade Now',
      isFeatured: true,
    },
    {
      title: 'Enterprise',
      description: 'Custom solutions for large organizations.',
      price: 'Contact Us',
      features: ['Dedicated account manager', 'Custom integrations', '24/7 support'],
      link: '/contact',
      buttonText: 'Contact Sales',
      isFeatured: false,
    },
  ];

  return (
    <section
      className="py-20 px-6 max-w-7xl mx-auto"
      aria-label="Pricing plans"
      data-aos="fade-up"
    >
        <h2
          className="text-5xl font-extrabold text-center text-indigo-900 mb-20 tracking-wide drop-shadow-md"
          data-aos="fade-down"
        >
        Pricing Plans
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            data-aos="fade-up"
            data-aos-delay={idx * 150}
            className={`flex flex-col rounded-lg border transition-transform transform hover:scale-105 hover:shadow-xl
              transition-colors duration-300
              ${
                plan.isFeatured
                  ? 'border-blue-600 bg-blue-50 hover:bg-blue-100 shadow-lg'
                  : 'border-gray-200 bg-white hover:border-blue-600 hover:bg-gray-100 shadow-sm'
              }`}
          >
            <div className="p-8 flex-grow">
              <h3
                className={`text-2xl font-semibold mb-4 ${
                  plan.isFeatured ? 'text-blue-700' : 'text-gray-900'
                }`}
              >
                {plan.title}
              </h3>
              <p className="text-gray-600 mb-6">{plan.description}</p>
              <p
                className={`text-4xl font-extrabold mb-6 ${
                  plan.isFeatured ? 'text-blue-800' : 'text-gray-900'
                }`}
              >
                {plan.price}
                {plan.price !== 'Contact Us' && (
                  <span className="text-base font-normal text-gray-600"> / month</span>
                )}
              </p>
              <ul className="mb-8 space-y-3 text-gray-700">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <svg
                      className={`w-5 h-5 ${
                        plan.isFeatured ? 'text-blue-600' : 'text-green-500'
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-8">
              <Link
                to={plan.link}
                className={`block text-center px-6 py-3 rounded-full font-semibold transition
                  ${
                    plan.isFeatured
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-800 text-white hover:bg-gray-900'
                  }`}
              >
                {plan.buttonText}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PricingPlans;
