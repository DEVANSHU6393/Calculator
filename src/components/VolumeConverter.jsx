import React, { useState } from "react";

const VolumeConverter = () => {
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("L");
  const [toUnit, setToUnit] = useState("mL");
  const [result, setResult] = useState("");

  const units = {
    L: 1,
    mL: 1000,
    gal: 0.264172,
    cup: 4.22675,
    pint: 2.11338,
    oz: 33.814,
  };

  const convert = () => {
    const conversion = (parseFloat(value) || 0) * (units[fromUnit] / units[toUnit]);
    setResult(conversion.toFixed(2));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Volume Converter</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Enter Value</label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full p-3 border rounded mb-4"
              placeholder="Enter value to convert"
            />
          </div>

          <div className="grid grid-cols-2 gap-2 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">From Unit</label>
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full p-3 border rounded"
              >
                {Object.keys(units).map((unit, i) => (
                  <option key={i} value={unit}>{unit}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">To Unit</label>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="w-full p-3 border rounded"
              >
                {Object.keys(units).map((unit, i) => (
                  <option key={i} value={unit}>{unit}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={convert}
            className="w-full bg-blue-500 text-white py-2 rounded mt-4"
          >
            Convert
          </button>

          {result && (
            <div className="mt-4 text-xl font-semibold text-gray-700">
              <p>{value} {fromUnit} is equal to <strong>{result}</strong> {toUnit}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VolumeConverter;