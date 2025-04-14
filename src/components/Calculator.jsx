import React, { useState } from "react";
import { ClipboardIcon, TrashIcon, CalculatorIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import "./Calculator.css";

const Calculator = () => {
  const [expr, setExpr] = useState("");
  const [history, setHistory] = useState([]);
  const [showScientific, setShowScientific] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const handleButtonClick = (value) => setExpr((prevExpr) => prevExpr + value);

  const calculate = () => {
    try {
      const result = eval(expr).toString();
      setHistory([...history, `${expr} = ${result}`]);
      setExpr(result);
    } catch {
      setExpr("Error");
    }
  };

  const clear = () => setExpr("");

  const backspace = () => setExpr(expr.slice(0, -1));

  const handleKeyDown = (e) => {
    if (/[0-9\+\-\*/\.]/.test(e.key)) handleButtonClick(e.key);
    else if (e.key === "Enter") calculate();
    else if (e.key === "Backspace") backspace();
    else if (e.key === "Escape") clear();
  };

  const handleScientific = (func) => {
    try {
      const num = parseFloat(expr);
      let result;
      switch (func) {
        case "sin": result = Math.sin(num); break;
        case "cos": result = Math.cos(num); break;
        case "tan": result = Math.tan(num); break;
        case "log": result = Math.log10(num); break;
        case "ln": result = Math.log(num); break;
        case "sqrt": result = Math.sqrt(num); break;
        case "^2": result = Math.pow(num, 2); break;
        default: return;
      }
      setHistory([...history, `${func}(${expr}) = ${result}`]);
      setExpr(result.toString());
    } catch {
      setExpr("Error");
    }
  };

  return (
    <div className="calculator-container" tabIndex={0} onKeyDown={handleKeyDown}>
      <div className="calculator-panel">
        <div className="display-wrapper">
          <input value={expr} className="calculator-display" readOnly />
          <button
            onClick={() => navigator.clipboard.writeText(expr)}
            className="copy-button"
            title="Copy result"
          >
            <ClipboardIcon className="icon" />
          </button>
        </div>

        <div className="calculator-buttons">
          {["7", "8", "9", "/", "4", "5", "6", "-", "1", "2", "3", "+", "0", ".", "←", "=", "Clear"].map((val, i) => {
            const className =
              val === "/" || val === "-" || val === "+" ? "button-operator" :
              val === "=" ? "button-equal" :
              val === "Clear" ? "button-clear" :
              val === "←" ? "button-back" : "";

            return (
              <button
                key={i}
                className={className}
                onClick={() => {
                  if (val === "=") calculate();
                  else if (val === "Clear") clear();
                  else if (val === "←") backspace();
                  else handleButtonClick(val);
                }}
              >
                {val}
              </button>
            );
          })}
        </div>

        <button onClick={() => setShowScientific(!showScientific)} className="toggle-button">
          {showScientific ? "Hide" : "Show"} Scientific
        </button>

        {showScientific && (
          <div className="scientific-panel">
            {["sin", "cos", "tan", "log", "ln", "sqrt", "^2"].map((func, i) => (
              <button key={i} className="button-scientific" onClick={() => handleScientific(func)}>
                {func}
              </button>
            ))}
          </div>
        )}

        <button onClick={() => setShowHistory(!showHistory)} className="toggle-button">
          {showHistory ? "Hide" : "Show"} History
        </button>
      </div>

      <AnimatePresence>
        {showHistory && (
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="history-panel"
          >
            <div className="history-header">
              <h3 className="history-title">
                <CalculatorIcon className="icon" /> History
              </h3>
              <button onClick={() => setHistory([])} className="history-clear">
                <TrashIcon className="icon-small" /> Clear
              </button>
            </div>
            <ul className="history-list">
              {history.slice(-20).reverse().map((item, index) => (
                <li key={index} className="history-item">{item}</li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Calculator;

