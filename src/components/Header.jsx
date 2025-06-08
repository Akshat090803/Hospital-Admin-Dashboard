
import React from "react";
import { FaBars, FaMoon, FaRegSun } from "react-icons/fa";
import { FiSun } from "react-icons/fi";

function Header({ darkMode, setDarkMode, setSidebarOpen }) {
  return (
    <div className={`fixed top-0 left-0 w-full z-30  px-4 py-3 md:px-6 md:py-4 flex items-center justify-between border-b border-gray-200   ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"} customShadow`}>
      <button
        className="lg:hidden p-2 hover:bg-gray-200 rounded-full"
        onClick={() => setSidebarOpen(true)}
      >
        <FaBars className="text-xl"/>
      </button>
      <h1 className="text-xl md:text-2xl font-bold font-roboto truncate md:pl-[280px]">
        Hospital Dashboard
      </h1>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`p-2 rounded-full ${
          darkMode ? "bg-gray-700" : "bg-gray-200"
        }`}
      >
        {
          darkMode ? <FiSun /> : <FaMoon />
        }
      </button>
    </div>
  );
}

export default Header;