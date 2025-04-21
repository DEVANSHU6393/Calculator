import React, { useState } from "react";
import "./VolumeConverter.css";

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
    const input = parseFloat(value);
    if (isNaN(input)) {
      setResult("");
      return;
    }

    const inLiters = input / units[fromUnit];
    const converted = inLiters * units[toUnit];
    setResult(converted.toFixed(2));
  };

  return (
    <div className="converter-container">
      <h2>Volume Converter</h2>

      <input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter value"
        className="converter-input"
      />

      <div className="converter-selects">
        <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}>
          {Object.keys(units).map((unit) => (
            <option key={unit} value={unit}>{unit}</option>
          ))}
        </select>

        <select value={toUnit} onChange={(e) => setToUnit(e.target.value)}>
          {Object.keys(units).map((unit) => (
            <option key={unit} value={unit}>{unit}</option>
          ))}
        </select>
      </div>

      <button onClick={convert} className="converter-button">
        Convert
      </button>

      {result && (
        <p className="converter-result">
          {value} {fromUnit} = {result} {toUnit}
        </p>
      )}
    </div>
  );
};

export default VolumeConverter;
