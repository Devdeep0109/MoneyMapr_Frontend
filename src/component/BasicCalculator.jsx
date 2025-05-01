import React, { useState } from "react";
import { X } from "lucide-react";

const BasicCalculator = ({ onClose }) => {
  const [input, setInput] = useState("");

  const handleClick = (value) => {
    if (value === "=") {
      try {
        setInput(eval(input).toString());
      } catch {
        setInput("Error");
      }
    } else if (value === "C") {
      setInput("");
    } else {
      setInput((prev) => prev + value);
    }
  };

  const buttons = [
    "7",
    "8",
    "9",
    "/",
    "4",
    "5",
    "6",
    "*",
    "1",
    "2",
    "3",
    "-",
    "0",
    ".",
    "=",
    "+",
    "C",
  ];

  return (
    <div className="fixed bottom-20 right-6 bg-white shadow-xl border border-gray-300 rounded-lg p-4 w-64 z-50">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-bold text-blue-700">Basic Calculator</h2>
        <button onClick={onClose}>
          <X size={20} />
        </button>
      </div>
      <input
        type="text"
        value={input}
        readOnly
        className="w-full mb-2 p-2 border border-gray-300 rounded text-right"
      />
      <div className="grid grid-cols-4 gap-2">
        {buttons.map((btn, i) => (
          <button
            key={i}
            onClick={() => handleClick(btn)}
            className="p-2 bg-blue-100 hover:bg-blue-200 rounded font-semibold"
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BasicCalculator;
