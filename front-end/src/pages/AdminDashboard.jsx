// AdminDashboard.jsx

import React from "react";
import { Link } from "react-router-dom";
import {
  FaPlusCircle,
  FaTasks,
  FaClipboardCheck,
  FaChartBar,
  FaChevronRight,
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const navItems = [
    { title: "Create Question", icon: <FaPlusCircle />, to: "/admin/create-question" },
    { title: "Create Test", icon: <FaTasks />, to: "/admin/create-test" },
    { title: "Assign Test", icon: <FaClipboardCheck />, to: "/admin/assign-test" },
    { title: "View Results", icon: <FaChartBar />, to: "/admin/results" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg px-6 py-8 hidden md:block">
        <h2 className="text-2xl font-bold text-gray-800 mb-10">Admin Panel</h2>
        <nav className="space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.title}
              to={item.to}
              className="flex items-center justify-between text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              <div className="flex items-center space-x-2">
                <span className="text-blue-500 text-lg">{item.icon}</span>
                <span className="text-sm font-medium">{item.title}</span>
              </div>
              <FaChevronRight className="text-xs" />
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 sm:p-10">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-3xl font-bold text-gray-800 mb-10"
        >
          Welcome, Admin 👋
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {navItems.map((item) => (
            <DashboardCard key={item.title} icon={item.icon} title={item.title} to={item.to} />
          ))}
        </motion.div>
      </main>
    </div>
  );
}

function DashboardCard({ icon, title, to }) {
  return (
    <Link
      to={to}
      className="group bg-white border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 p-6 rounded-2xl shadow hover:shadow-md flex items-center space-x-4"
    >
      <div className="text-blue-600 text-4xl transition-transform duration-300 group-hover:scale-110">
        {icon}
      </div>
      <div className="text-lg font-semibold text-gray-800 group-hover:text-blue-700">
        {title}
      </div>
    </Link>
  );
}
