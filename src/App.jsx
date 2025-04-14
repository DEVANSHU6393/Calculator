import "./index.css";
import React, { useState, useEffect } from "react";
import Calculator from "./components/Calculator";
import LengthConverter from "./components/LengthConverter";
import VolumeConverter from "./components/VolumeConverter";
import CurrencyConverter from "./components/CurrencyConverter";
import Sidebar from "./components/Sidebar";

export default function App() {
  const [active, setActive] = useState("Calculator");
  const [sidebarOpen, setSidebarOpen] = useState(true); // State for toggling sidebar

  useEffect(() => {
    const saved = localStorage.getItem("activeTool");
    if (saved) setActive(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("activeTool", active);
  }, [active]);

  const renderContent = () => {
    switch (active) {
      case "Calculator":
        return <Calculator />;
      case "Length":
        return <LengthConverter />;
      case "Volume":
        return <VolumeConverter />;
      case "Currency":
        return <CurrencyConverter />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar component */}
      <Sidebar onSelect={setActive} activeItem={active} isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      {/* Main content */}
      <main
        className={`flex-1 p-6 bg-gray-100 transition-all duration-300 ease-in-out ${
          sidebarOpen ? "ml-64" : "ml-16"
        } md:ml-64 lg:ml-64 xl:ml-64`}
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{active}</h1>
        {renderContent()}
      </main>
    </div>
  );
}
