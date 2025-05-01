// UserSalaryBreak.jsx
import React from "react";
import { useBudget } from "../../context/BudgetContext";
import { useEffect } from "react";

const UserSalaryBreak = ({ onCalculate }) => {
  const {
    userSalary,
    setUserSalary,
    userNeeds,
    setUserNeeds,
    userWants,
    setUserWants,
    userSavings,
    setUserSavings,
  } = useBudget();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "need") setUserNeeds(value);
    else if (name === "want") setUserWants(value);
    else if (name === "save") setUserSavings(value);
  };

  // Automatically calculate savings when Salary, Needs, and Wants are all provided
  useEffect(() => {
    if (userSalary && userNeeds && userWants) {
      const calculatedSavings =
        userSalary - (Number(userNeeds) + Number(userWants));
      setUserSavings(calculatedSavings > 0 ? calculatedSavings : 0); // Ensure savings is not negative
    }
  }, [userSalary, userNeeds, userWants, setUserSavings]);

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-6xl mx-4 sm:mx-8 md:mx-0">
      <h1 className="text-3xl font-bold mb-6 text-center text-black">
        50:30:20 Budget Planner
      </h1>

      <p className="mb-4 text-gray-700 text-sm">
        The 50:30:20 rule is a simple budgeting framework. Spend 50% of your
        income on needs, 30% on wants, and 20% on savings. Use this tool to plan
        and compare your budget against this rule.
      </p>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium">
          Monthly Salary (₹)
        </label>
        <input
          type="number"
          min="0"
          value={userSalary}
          onChange={(e) => setUserSalary(e.target.value)}
          className="w-full mt-1 p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-gray-700 font-medium">Needs (₹)</label>
          <input
            type="number"
            name="need"
            min="0"
            placeholder="Amount"
            value={userNeeds}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Wants (₹)</label>
          <input
            type="number"
            name="want"
            placeholder="Amount"
            min="0"
            value={userWants}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Savings (₹)</label>
          <input
            type="number"
            name="save"
            min="0"
            placeholder="Amount"
            value={userSavings}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <button
        onClick={onCalculate}
        className="mt-6 w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-200"
      >
        Calculate
      </button>
    </div>
  );
};

export default UserSalaryBreak;
