import React, { useEffect } from "react";
import {
  CalculatorIcon,
  ScaleIcon,
  CubeIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

const Sidebar = ({ onSelect, activeItem, isOpen, setIsOpen }) => {
  const items = [
    { name: "Calculator", icon: <CalculatorIcon className="h-6 w-6" /> },
    { name: "Length", icon: <ScaleIcon className="h-6 w-6" /> },
    { name: "Volume", icon: <CubeIcon className="h-6 w-6" /> },
    { name: "Currency", icon: <CurrencyDollarIcon className="h-6 w-6" /> },
  ];

  // Auto-collapse on screen resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    handleResize(); // Run once on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [setIsOpen]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (name) => {
    onSelect(name);

    // Auto-collapse on mobile
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  return (
    <div
      role="navigation"
      aria-label="Sidebar"
      className={`fixed top-0 left-0 z-50 h-full bg-gray-800 text-white transition-all duration-300 ease-in-out flex flex-col ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gray-700 mb-2">
        {isOpen && <h2 className="text-xl font-semibold">My App</h2>}
        <button
          onClick={toggleSidebar}
          className="text-white text-2xl md:hidden"
          aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
        >
          {isOpen ? "❌" : "☰"}
        </button>
      </div>

      {/* Menu */}
      <div className="space-y-2 flex-1 px-2">
        {items.map(({ name, icon }) => (
          <button
            key={name}
            onClick={() => handleItemClick(name)}
            className={`group relative flex items-center w-full text-left px-4 py-2 rounded-md transition duration-200 ${
              activeItem === name ? "bg-gray-700 font-bold" : "hover:bg-gray-700"
            }`}
          >
            <div className="flex-shrink-0">{icon}</div>
            <span className={`ml-4 ${isOpen ? "block" : "hidden"}`}>{name}</span>

            {/* Tooltip */}
            {!isOpen && (
              <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 whitespace-nowrap bg-gray-700 text-white text-xs px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                {name}
              </div>
            )}
          </button>
        ))}
      </div>

      {/* About Me */}
      <div className="p-4 bg-gray-700 text-center mt-auto">
        {isOpen ? (
          <>
            <h3 className="text-lg font-semibold">About Me</h3>
            <p className="text-sm text-gray-300 mb-1">
              Hi, I'm a passionate developer building useful apps!
            </p>
            <a
              href="https://devanshuportfolioo.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 text-sm hover:text-blue-500"
            >
              Portfolio
            </a>
          </>
        ) : (
          <div className="text-sm text-gray-400">Me</div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;

