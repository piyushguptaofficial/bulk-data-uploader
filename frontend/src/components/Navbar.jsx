import React from "react";

const Navbar = ({ darkMode, toggleDarkMode }) => {
  return (
    <nav className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
        📂 Bulk Data Uploader
      </h1>
      <button
        onClick={toggleDarkMode}
        className="bg-gray-300 dark:bg-gray-700 px-3 py-1 rounded shadow hover:bg-gray-400 dark:hover:bg-gray-600"
      >
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
    </nav>
  );
};

export default Navbar;
