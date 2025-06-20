import React, { useEffect, useState } from "react";
import FileUpload from "./components/FileUpload";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";

const App = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white p-4">
      <Toaster position="top-right" />
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <FileUpload />
      <Footer/>
    </div>
  );
};

export default App;
