// NewCar.jsx
import React, { useState } from "react";
import Navbar from "./Navbar";
import { FaCarSide, FaMoneyBillWave, FaClock, FaPercent } from "react-icons/fa";
import axios from "axios";

const NewCar = () => {
  const [salary, setSalary] = useState("");
  const [carPrice, setCarPrice] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [emiRateOfInterest, setEmiRateOfInterest] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const minDown = 0.2 * carPrice;

    if (Number(downPayment) < minDown) {
      alert(
        "⚠️ Downpayment is less than 20% of the car price. It's risky to buy now. Try saving more before proceeding."
      );
      return;
    }

    try {
      const res = await axios.post("http://localhost:8080/api/newcar", {
        salary,
        carPrice,
        loanTerm,
        downPayment,
        emiRateOfInterest,
      });
      setResult(res.data);
    } catch (error) {
      console.error("Error fetching result", error);
    }
  };

  return (
    <div className=" bg-gradient-to-br from-blue-100 to-purple-200 min-h-screen ">
      <Navbar />
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-8 py-10 px-6">
        <h1 className="text-4xl font-bold text-blue-900 mb-4">
          Thinking of Buying a Car? Plan Smart with the 20/4/10 Rule!
        </h1>
        <p className="text-lg text-gray-700">
          Avoid future stress with wise car finance decisions. Let us guide you.
        </p>
        {/* <FaCarSide className="text-7xl text-purple-600 mt-6 animate-pulse" /> */}
      </div>

      {/* Rule Explanation Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-6xl mx-auto px-6">
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <FaMoneyBillWave className="text-3xl text-green-500 mb-2 mx-auto" />
          <h3 className="text-xl font-bold mb-1">20% Down Payment</h3>
          <p className="text-gray-600 text-sm">
            Put at least 20% down upfront to reduce your loan burden.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <FaClock className="text-3xl text-blue-500 mb-2 mx-auto" />
          <h3 className="text-xl font-bold mb-1">4-Year Loan Term</h3>
          <p className="text-gray-600 text-sm">
            Choose a loan period of 4 years or less to save on interest.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6  text-center">
          <FaPercent className="text-3xl text-purple-500 mb-2 mx-auto" />
          <h3 className="text-xl font-bold mb-1">10% Monthly Cost</h3>
          <p className="text-gray-600 text-sm">
            Total car-related expenses shouldn’t exceed 10% of your salary.
          </p>
        </div>
      </div>

      {/* Calculator Section */}
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto flex flex-col gap-6">
        {/* Form Section */}
        <div className="w-full">
          <h2 className="text-2xl font-semibold text-blue-700 mb-6 text-center">
            🧮 Car Affordability Calculator
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="number"
              placeholder="Monthly Salary (₹)"
              className="w-full p-3 border rounded-md"
              value={salary}
              min={0}
              onChange={(e) => setSalary(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Car Price (₹)"
              className="w-full p-3 border rounded-md"
              value={carPrice}
              min={0}
              onChange={(e) => setCarPrice(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Expected Loan Term (Years)"
              className="w-full p-3 border rounded-md"
              value={loanTerm}
              max={4}
              min={0}
              onChange={(e) => setLoanTerm(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Expected Rate of Interest of EMI (%)"
              className="w-full p-3 border rounded-md"
              value={emiRateOfInterest}
              min={0}
              step="0.001"
              onChange={(e) => setEmiRateOfInterest(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Down Payment (₹)"
              className="w-full p-3 border rounded-md"
              value={downPayment}
              min={0}
              onChange={(e) => setDownPayment(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-purple-600 text-white font-semibold py-3 rounded-md hover:bg-purple-700 transition"
            >
              Calculate
            </button>
          </form>
        </div>

        {/* Result Section (Below the form) */}
        {/* Result Section (Below the form) */}
        <div className="w-full bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl p-6 text-center flex items-center justify-center shadow-md hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:scale-105">
          {result && result.length > 0 ? (
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-purple-800 mb-4 tracking-wide animate-pulse">
                🎯 Result
              </h3>

              {result[0] === 0 ? (
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-green-600">
                    ₹{Number(result[1]).toFixed(2)}
                  </p>
                  <p className="text-base text-gray-600">
                    Estimated Monthly EMI
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-base md:text-lg font-medium text-red-600">
                    Wait for{" "}
                    <span className="font-semibold">{result[0]} months</span>{" "}
                    before buying a new car
                  </p>
                  <p className="text-lg md:text-xl font-bold text-green-600">
                    ₹{Number(result[1]).toFixed(2)} EMI per month
                  </p>
                  {result.length > 2 && (
                    <p className="text-sm md:text-base text-gray-600">
                      Ideal EMI: ₹{Number(result[2]).toFixed(2)} per month
                    </p>
                  )}
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-500 font-medium animate-fadeIn">
              Enter details to calculate EMI
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewCar;
