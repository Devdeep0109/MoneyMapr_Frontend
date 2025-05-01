import React, { useState, useEffect } from "react";
import { useBudget } from "../context/BudgetContext";
import { useNavigate } from "react-router-dom";

const ElaboratePage = () => {
  const categories = {
    needs: [
      { key: "housing", icon: "🏠" },
      { key: "food", icon: "🍽️" },
      { key: "transportation", icon: "🚗" },
      { key: "utilities", icon: "💡" },
      { key: "insurance", icon: "🛡️" },
      { key: "loanPayments", icon: "💳" },
      { key: "childCare", icon: "🧸" },
    ],
    wants: [
      { key: "subscriptions", icon: "📺" },
      { key: "travel", icon: "✈️" },
      { key: "entertainment", icon: "🎮" },
      { key: "diningOut", icon: "🍔" },
      { key: "luxuryShopping", icon: "🛍️" },
      { key: "gym", icon: "🏋️" },
    ],
    savings: [
      { key: "emergencyFund", icon: "🚨" },
      { key: "retirement", icon: "👵" },
      { key: "realEstate", icon: "🏘️" },
    ],
  };

  const [formData, setFormData] = useState({
    needs: {},
    wants: {},
    savings: {},
  });

  const navigate = useNavigate();
  const { userSalary, userSavings, setResultData, setBudgetInputs } =
    useBudget();

  useEffect(() => {
    const initializeCategory = (cat) => {
      const initialValues = {};
      categories[cat].forEach((item) => {
        initialValues[item.key] = { amount: "", priority: "3" };
      });
      setFormData((prev) => ({ ...prev, [cat]: initialValues }));
    };

    initializeCategory("needs");
    initializeCategory("wants");
    initializeCategory("savings");
  }, []);

  // Fixed handle change function
  const handleChange = (category, itemKey, field, value) => {
    if (field === "amount" && (isNaN(value) || value < 0)) return;

    setFormData((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [itemKey]: {
          ...prev[category][itemKey],
          [field]: value,
        },
      },
    }));
  };

  const flattenFormData = (data, salary, savings) => {
    const result = {
      userSalary: salary,
      userSavings: savings,
    };

    // Correctly process all category data
    // eslint-disable-next-line no-unused-vars
    Object.entries(data).forEach(([category, items]) => {
      Object.entries(items).forEach(([itemKey, values]) => {
        result[`${itemKey}Amount`] = parseFloat(values.amount || "0");
        result[`${itemKey}Priority`] = parseInt(values.priority || "0");
      });
    });

    return result;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = flattenFormData(formData, userSalary, userSavings);
      console.log("Sending payload:", payload); // Debug the payload

      const res = await fetch("http://localhost:8080/api/budget-correction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("Response from backend:", data);
      setResultData(data); // ✅ Save to context
      setBudgetInputs(payload); // ✅ Save input data to context

      navigate("/suggestion");
      alert("Form submitted successfully!");
    } catch (err) {
      console.error("Submission Error:", err);
      alert("Failed to submit data.");
    }
  };

  const renderSection = (title, color, category) => (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h2 className={`text-lg font-semibold ${color} mb-3 capitalize`}>
        {title}
      </h2>
      {categories[category].map(({ key, icon }) => (
        <div className="mb-3" key={key}>
          <label className="block text-sm text-gray-700 capitalize mb-1 flex items-center gap-1">
            <span>{icon}</span>
            <span>{key.replace(/([A-Z])/g, " $1")}</span>
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              min="0"
              value={formData[category]?.[key]?.amount || ""}
              onChange={(e) =>
                handleChange(category, key, "amount", e.target.value)
              }
              className="w-2/3 px-3 py-1.5 border rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
              placeholder="Amount"
            />
            <select
              value={formData[category]?.[key]?.priority || "1"}
              onChange={(e) =>
                handleChange(category, key, "priority", e.target.value)
              }
              className="w-1/3 px-2 py-1.5 border rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              <option value="1">Priority 1</option>
              <option value="2">Priority 2</option>
              <option value="3">Priority 3</option>
              <option value="4">Priority 4</option>
              <option value="5">Priority 5</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );

  // const formatName = (name) =>
  //   name
  //     .replace(/([A-Z])/g, " $1")
  //     .replace(/Amount$/, "")
  //     .trim()
  //     .replace(/^./, (str) => str.toUpperCase());

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-pink-100 py-10 px-4">
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-10">
        Enter Your Budget & Priorities
      </h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {renderSection("Needs", "text-blue-700", "needs")}
        {renderSection("Wants", "text-green-700", "wants")}
        {renderSection("Savings", "text-purple-700", "savings")}

        <div className="md:col-span-3 mt-6 text-center">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded-xl shadow-md hover:bg-indigo-700 transition duration-300"
          >
            Submit Budget Info
          </button>
        </div>
      </form>

      {/* {resultData && (
        <div className="mt-10 max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-indigo-700 mb-4 text-center">
            Suggestions Based on Your Budget
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {resultData.map((item, index) => {
              const value = parseFloat(item.value);
              const displayValue =
                !isNaN(value) && value !== null ? value.toFixed(2) : "N/A";

              return (
                <div
                  key={index}
                  className="border p-4 rounded-md bg-gray-50 shadow-sm"
                >
                  <h3 className="text-md font-semibold text-gray-700 capitalize">
                    {formatName(item.name)}
                  </h3>
                  <p className="text-sm text-gray-600">
                    💰 Suggested Value to reduce:{" "}
                    <span className="text-blue-600">{displayValue}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    🎯 Priority:{" "}
                    <span className="text-purple-600">
                      {item.priority ?? "N/A"}
                    </span>
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )} */}
    </div>
  );
};

export default ElaboratePage;
