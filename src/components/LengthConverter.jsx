import React, { useState } from "react";

const lengthUnits = [
  { label: "Meters", value: "m" },
  { label: "Kilometers", value: "km" },
  { label: "Miles", value: "mi" },
  { label: "Yards", value: "yd" },
  { label: "Centimeters", value: "cm" },
];

const LengthConverter = () => {
  const [inputValue, setInputValue] = useState("");
  const [convertedValue, setConvertedValue] = useState("");
  const [fromUnit, setFromUnit] = useState("m");
  const [toUnit, setToUnit] = useState("km");

  const handleConversion = () => {
    const value = parseFloat(inputValue);
    if (isNaN(value)) return;
    
    let result = 0;

    // Conversion logic
    if (fromUnit === "m" && toUnit === "km") result = value / 1000;
    else if (fromUnit === "km" && toUnit === "m") result = value * 1000;
    else if (fromUnit === "m" && toUnit === "mi") result = value / 1609.34;
    else if (fromUnit === "mi" && toUnit === "m") result = value * 1609.34;
    // Add other conversion logic as needed

    setConvertedValue(result);
  };

  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Length Converter</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">From:</label>
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter length"
        />
        <select
          value={fromUnit}
          onChange={(e) => setFromUnit(e.target.value)}
          className="mt-2 block w-full p-2 border border-gray-300 rounded-md"
        >
          {lengthUnits.map((unit) => (
            <option key={unit.value} value={unit.value}>
              {unit.label}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleConversion}
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
      >
        Convert
      </button>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">To:</label>
        <select
          value={toUnit}
          onChange={(e) => setToUnit(e.target.value)}
          className="mt-2 block w-full p-2 border border-gray-300 rounded-md"
        >
          {lengthUnits.map((unit) => (
            <option key={unit.value} value={unit.value}>
              {unit.label}
            </option>
          ))}
        </select>
      </div>

      {convertedValue && (
        <div className="mt-4 text-lg font-semibold text-center">
          <p>Converted Value: {convertedValue} {toUnit}</p>
        </div>
      )}
    </div>
  );
};

export default LengthConverter;
