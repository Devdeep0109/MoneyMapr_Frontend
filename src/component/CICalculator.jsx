import React, { useState } from "react";
import axios from "axios";

const CICalculator = () => {
  const [formData, setFormData] = useState({
    principal: "",
    rate: "",
    time: "",
    frequency: "Annually",
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8080/api/compoundcalculator",
        formData
      );

      setResult(res.data); // Assuming backend returns { amount, interest }
    } catch (error) {
      console.error("API Error", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold text-center mb-4 text-blue-700">
        🧮 Compound Interest Calculator
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          min="0"
          name="principal"
          placeholder="Principal Amount (₹)"
          value={formData.principal}
          onChange={handleChange}
          required
          className="w-full p-3 border border-blue-300 rounded-md"
        />

        <input
          type="number"
          name="rate"
          min="0"
          placeholder="Annual Interest Rate (%)"
          value={formData.rate}
          onChange={handleChange}
          required
          className="w-full p-3 border border-blue-300 rounded-md"
        />

        <input
          type="number"
          name="time"
          min="0"
          placeholder="Time Period (Years)"
          value={formData.time}
          onChange={handleChange}
          required
          className="w-full p-3 border border-blue-300 rounded-md"
        />

        <select
          name="frequency"
          value={formData.frequency}
          onChange={handleChange}
          className="w-full p-3 border border-blue-300 rounded-md"
        >
          <option value="Annually">Annually</option>
          <option value="Half-Yearly">Half-Yearly</option>
          <option value="Quarterly">Quarterly</option>
          <option value="Monthly">Monthly</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-md"
        >
          Calculate
        </button>
      </form>

      {result && (
        <div className="mt-6 p-4 bg-green-100 rounded-md text-green-800">
          <p>
            <strong>Total Amount:</strong> ₹{result[0]}
          </p>
          <p>
            <strong>Interest Earned:</strong> ₹{result[1]}
          </p>
        </div>
      )}
    </div>
  );
};

export default CICalculator;
