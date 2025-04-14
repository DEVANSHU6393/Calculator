import React, { useState, useEffect } from "react";
import axios from "axios";
import './CurrencyConverter.css'; // Import the CSS file

const CurrencyConverter = () => {
  const [inputValue, setInputValue] = useState("");
  const [convertedValue, setConvertedValue] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetch live exchange rates from the API
  const fetchExchangeRates = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
      setRates(response.data.rates);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching exchange rates:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExchangeRates(); // Fetch rates on component mount
  }, [fromCurrency]);

  const handleConversion = () => {
    const value = parseFloat(inputValue);
    if (isNaN(value) || !rates[toCurrency]) return;
    const converted = (value * rates[toCurrency]).toFixed(2);
    setConvertedValue(converted);
  };

  return (
    <div className="currency-container">
      <h2>Currency Converter</h2>

      <div>
        <label>Amount:</label>
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter amount"
        />
      </div>

      <div className="currency-dropdowns">
        <div>
          <label>From:</label>
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="INR">INR</option>
            <option value="CAD">CAD</option>
          </select>
        </div>

        <div>
          <label>To:</label>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
          >
            {Object.keys(rates).map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button onClick={handleConversion} className="currency-button">
        Convert
      </button>

      {loading ? (
        <div className="currency-loading">Loading...</div>
      ) : convertedValue && (
        <div className="currency-result">
          Converted Value: {convertedValue} {toCurrency}
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;
