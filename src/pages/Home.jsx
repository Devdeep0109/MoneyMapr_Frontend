// Home.jsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useBudget } from "../context/BudgetContext";
import { ArrowDown, ArrowUp, Calculator } from "lucide-react";
import Graph from "../component/homeComponents/Graph";
import UserSalaryBreak from "../component/homeComponents/UserSalaryBreak";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import BasicCalculator from "../component/BasicCalculator";
import Navbar from "../component/Navbar";
import HeroSection from "../component/homeComponents/HeroSection";
import Footer from "../component/Footer";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

const Home = () => {
  const {
    userSalary,
    userNeeds,
    // eslint-disable-next-line no-unused-vars
    setUserNeeds,
    userWants,
    // eslint-disable-next-line no-unused-vars
    setUserWants,
    userSavings,
    // eslint-disable-next-line no-unused-vars
    setUserSavings,
  } = useBudget();
  const [idealBudget, setIdealBudget] = useState({ need: 0, want: 0, save: 0 });
  const [userBudget, setUserBudget] = useState({ need: 0, want: 0, save: 0 });
  const [backendDiff, setBackendDiff] = useState(null);
  const [showCalculator, setShowCalculator] = useState(false);

  const navigate = useNavigate(); // Get navigate function
  const graphRef = useRef(null);

  useEffect(() => {
    if (idealBudget.need > 0 && graphRef.current) {
      graphRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [idealBudget]);

  const handleNavigate = () => {
    navigate("/elaborate"); // Navigate to /elaborate without reloading
  };

  const handleCalculate = () => {
    const income = parseFloat(userSalary) || 0;
    const needs = parseFloat(userNeeds) || 0;
    const wants = parseFloat(userWants) || 0;
    console.log("userSavings before parse:", userSavings);

    const savings = parseFloat(userSavings) || 0;

    if (income === 0) {
      alert("Please enter a valid salary amount.");
      return;
    }

    const idealNeeds = (income * 50) / 100;
    const idealWants = (income * 30) / 100;
    const idealSavings = (income * 20) / 100;

    setIdealBudget({ need: idealNeeds, want: idealWants, save: idealSavings });
    setUserBudget({ need: needs, want: wants, save: savings }); // <- using parsed values directly

    sendBudgetToBackend(needs, wants, savings, income);
  };

  const sendBudgetToBackend = async (needs, wants, savings, salaryAmount) => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/budget-calculation",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            salary: parseFloat(salaryAmount),
            needs: parseFloat(needs),
            wants: parseFloat(wants),
            savings: parseFloat(savings),
          }),
        }
      );

      const data = await response.json();
      setBackendDiff(data);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 w-full">
      <div className="w-full mb-6">
        <Navbar />
      </div>
      <HeroSection />
      <div className={`transition-all duration-700 ease-in-out  w-10/12 `}>
        <UserSalaryBreak onCalculate={handleCalculate} />
      </div>

      <div
        ref={graphRef}
        className={`transition-all duration-700 ease-in-out ${
          idealBudget.need > 0
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        } w-10/12 `}
      >
        {idealBudget.need > 0 && (
          <Graph
            idealBudget={idealBudget}
            userBudget={userBudget}
            backendDiff={backendDiff}
            onNavigate={handleNavigate}
          />
        )}
      </div>

      <button
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 z-50"
        onClick={() => setShowCalculator(!showCalculator)}
      >
        <Calculator />
      </button>

      {showCalculator && (
        <BasicCalculator onClose={() => setShowCalculator(false)} />
      )}

      <Footer />
    </div>
  );
};

export default Home;
