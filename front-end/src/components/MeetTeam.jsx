import React from 'react';

const teamMembers = [
  {
    name: 'Muthumaran T',
    role: 'Founder & CEO',
    img: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Leena Mathew',
    role: 'CTO',
    img: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'Kiran Sharma',
    role: 'Product Manager',
    img: 'https://randomuser.me/api/portraits/men/76.jpg',
  },
  {
    name: 'Alice Johnson',
    role: 'Lead Designer',
    img: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
];

const MeetTheTeam = () => {
  return (
    <section
      className="py-20 bg-gradient-to-br from-indigo-50 via-white to-indigo-100"
      aria-label="Meet the Team"
    >
      <div className="max-w-6xl mx-auto text-center px-6">
        <h2
          className="text-5xl font-extrabold mb-20 text-indigo-900 drop-shadow-[0_4px_8px_rgba(67,56,202,0.3)] tracking-tight"
          data-aos="fade-down"
        >
          Meet the Team
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-14">
          {teamMembers.map((member, i) => (
            <div
              key={i}
              tabIndex={0}
              className="group bg-white rounded-3xl shadow-xl p-8 cursor-pointer
                transform transition-transform duration-500 ease-in-out
                hover:scale-105 hover:shadow-indigo-400/40 focus:scale-105 focus:shadow-indigo-400/40
                animate-fadeUp"
              style={{ animationDelay: `${i * 150}ms`, animationFillMode: 'forwards' }}
              aria-label={`${member.name}, ${member.role}`}
            >
              <div
                className="relative w-32 h-32 mx-auto mb-8 rounded-full overflow-hidden shadow-lg
                  border-4 border-indigo-200 group-hover:border-indigo-400 transition-colors duration-300
                  transform-gpu group-hover:rotate-3 group-hover:scale-110"
              >
                <img
                  src={member.img}
                  alt={`Photo of ${member.name}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <h4 className="text-2xl font-semibold text-indigo-900 mb-2 transition-colors duration-300 group-hover:text-indigo-600">
                {member.name}
              </h4>
              <p className="text-indigo-700 group-hover:text-indigo-500 text-lg transition-colors duration-300">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeUp {
          animation-name: fadeUp;
          animation-duration: 0.7s;
          animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          animation-fill-mode: forwards;
          opacity: 0;
        }
        /* Focus outline for accessibility */
        div[tabindex="0"]:focus {
          outline: 2px solid #6366f1; /* Indigo-500 */
          outline-offset: 3px;
        }
      `}</style>
    </section>
  );
};

export default MeetTheTeam;
