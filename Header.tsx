import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaSun,
  FaMoon,
  FaHome,
  FaInfoCircle,
  FaSearch,
  FaCloudSun,
  FaChartLine,
} from "react-icons/fa";

interface HeaderProps {
  onThemeToggle: () => void;
  isDarkMode: boolean;
}

const Header: React.FC<HeaderProps> = ({ onThemeToggle, isDarkMode }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const navigate = useNavigate();

  // Ensure dark theme is default on page load
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  // List of pages with names and routes
  const pages = [
    { name: "Home", path: "/" },
    { name: "Forecast", path: "/weather-prediction" },
    { name: "Quantum Weather Prediction", path: "/forecast" },
    { name: "Extreem Prediction", path:"/extreem" },
    { name: "About", path: "/about" },
    // Add more pages here if needed
  ];

  // Filter suggestions based on search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim()) {
      const filteredSuggestions = pages
        .filter((page) => page.name.toLowerCase().includes(value.toLowerCase()))
        .map((page) => page.name);
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  // Handle form submission to navigate to the search results page
  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
    setSuggestions([]); // Hide suggestions on submit
  };

  // Navigate to a page when a suggestion is clicked
  const handleSuggestionClick = (pagePath: string) => {
    navigate(pagePath);
    setSearchTerm("");
    setSuggestions([]); // Clear suggestions after navigation
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      } shadow-md transition-colors duration-300 ease-in-out animate-fadeIn`}
    >
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left Section: Logo and Title */}
        <div className="flex items-center space-x-2">
          <img
            src="src\public\Screenshot_2024-11-14_192041-removebg-preview.png"
            alt="Logo"
            className="w-7 h-7 transition-transform duration-300 ease-in-out transform hover:scale-110 animate-fadeInLeft"
          />
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent animate-pulse">
            QuantaWeather
          </h1>
        </div>

        {/* Right Section: Navigation Links, Search, and Theme Toggle */}
        <div className="flex items-center space-x-4 animate-fadeInRight">
          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-4">
            {pages.map((page) => (
              <NavLink
                key={page.path}
                to={page.path}
                className={({ isActive }) =>
                  `flex items-center ${
                    isActive
                      ? "text-blue-500 font-semibold"
                      : "text-gray-600 dark:text-gray-300"
                  } hover:text-blue-500 transition duration-300 ease-in-out transform hover:-translate-y-1 text-base`
                }
              >
                {page.name === "Home" && <FaHome className="mr-1" />}
                {page.name === "Quantum Weather Prediction" && (
                  <FaCloudSun className="mr-1" />
                )}
                {page.name === "Forecast" && <FaChartLine className="mr-1" />}
                {page.name === "Extreem Prediction" && <FaChartLine className="mr-1" />}
                {page.name === "About" && <FaInfoCircle className="mr-1" />}
                {page.name}
              </NavLink>
            ))}
          </nav>

          {/* Search Bar with Suggestions */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden sm:flex items-center relative bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-1 space-x-2 transition-all duration-300 ease-in-out hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            <FaSearch className="text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-20 md:w-32 bg-transparent text-sm text-gray-800 dark:text-gray-100 focus:outline-none"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            {/* Suggestions Dropdown */}
            {suggestions.length > 0 && (
              <ul className="absolute top-10 left-0 right-0 bg-white dark:bg-gray-700 rounded-md shadow-lg z-10">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() =>
                      handleSuggestionClick(
                        pages.find((page) => page.name === suggestion)?.path ||
                          "/"
                      )
                    }
                    className="px-4 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100"
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </form>

          {/* Theme Toggle */}
          <button
            onClick={onThemeToggle}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition duration-300 ease-in-out transform hover:rotate-180"
          >
            {isDarkMode ? (
              <FaSun className="w-5 h-5 text-yellow-500 animate-spin-slow" />
            ) : (
              <FaMoon className="w-5 h-5 text-gray-500 animate-spin-slow" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;