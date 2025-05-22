import React from 'react';
import { motion } from 'framer-motion';

const faqs = [
  {
    question: 'How do I create an account?',
    answer:
      'You can create an account by clicking the sign-up button on the top right and filling out the registration form.',
  },
  {
    question: 'Can I change my subscription plan later?',
    answer:
      'Yes, you can upgrade or downgrade your plan anytime from your account settings.',
  },
  {
    question: 'Is there a free trial available?',
    answer:
      'Absolutely! We offer a 14-day free trial for all new users with full access to features.',
  },
  {
    question: 'How do I contact support?',
    answer:
      'Our support team is available 24/7 via chat, email, or phone to assist you with any questions.',
  },
];

const FAQAndNewsletter = () => {
  return (
    <section className="bg-slate-50 py-24" aria-label="FAQs and Newsletter Signup">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid gap-16 lg:grid-cols-2">

        {/* FAQs Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-extrabold text-sky-700 mb-10 text-center lg:text-left tracking-tight drop-shadow-md">
            Frequently Asked Questions
          </h2>
          <div className="max-w-xl mx-auto lg:mx-0 space-y-6">
            {faqs.map((faq, i) => (
              <motion.details
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="border border-sky-200 rounded-xl p-5 group bg-white hover:bg-sky-50 transition-colors duration-300 shadow-sm"
                open={i === 0}
              >
                <summary className="cursor-pointer font-semibold text-slate-800 group-open:text-sky-600 transition-colors duration-300">
                  {faq.question}
                </summary>
                <p className="mt-3 text-slate-600 leading-relaxed">{faq.answer}</p>
              </motion.details>
            ))}
          </div>
        </motion.div>

        {/* Newsletter Signup Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-sky-100 to-white rounded-3xl p-12 shadow-lg flex flex-col justify-center items-center text-center"
        >
          <h2 className="text-4xl font-extrabold text-sky-700 mb-6 tracking-wide drop-shadow-md">
            Stay Updated
          </h2>
          <p className="text-slate-700 mb-10 max-w-md">
            Subscribe to our newsletter to receive the latest updates, tips, and exclusive offers.
          </p>
          <form className="w-full max-w-md flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              aria-label="Email address"
              required
              className="flex-grow p-4 rounded-lg border border-sky-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-400 focus:outline-none transition"
            />
            <button
              type="submit"
              className="bg-sky-600 text-white font-semibold px-8 py-4 rounded-lg hover:bg-sky-700 transition"
            >
              Subscribe
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQAndNewsletter;
