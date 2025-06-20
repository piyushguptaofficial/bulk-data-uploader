import React from "react";

const Footer = () => {
  return (
    <footer className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400 border-t pt-4">
      <p>© {new Date().getFullYear()} Built by Piyush • Bulk Data Uploader</p>
      <a
        href="https://github.com/piyushguptaofficial"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 dark:text-blue-400 hover:underline"
      >
        GitHub Repo 🔗
      </a>
    </footer>
  );
};

export default Footer;
