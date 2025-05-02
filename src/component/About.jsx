import React from "react";
import Navbar from "./Navbar";
import { FaPiggyBank, FaBalanceScaleLeft, FaChartPie } from "react-icons/fa";

const About = () => {
  return (
    <div className="bg-white  min-h-screen w-full">
      <Navbar />
      {/* Intro Section */}
      <div className="max-w-5xl mx-auto mt-5 mb-10 text-center px-6 py-4">
        <h1 className="text-4xl font-bold text-indigo-700 mb-4">
          Why Budgeting Matters
        </h1>
        <p className="text-gray-700 text-lg">
          Managing money is not just about spending less—it's about
          understanding where your money goes and aligning it with your goals.
          MoneyMapr helps you tackle{" "}
          <span className="font-semibold text-red-500">
            unbalanced budgeting
          </span>{" "}
          by using data-driven suggestions that align with the 50:30:20 rule.
        </p>
        <div className="flex justify-center gap-6 mt-6">
          <FaPiggyBank className="text-pink-500 text-5xl" />
          <FaBalanceScaleLeft className="text-green-500 text-5xl" />
          <FaChartPie className="text-indigo-500 text-5xl" />
        </div>
      </div>

      {/* How Budgeting Works */}
      <div className="max-w-5xl mx-auto px-6 py-4">
        <h2 className="text-3xl font-semibold text-purple-700 mb-6 text-center">
          How Budgeting is Done
        </h2>

        {/* Wants Deduction Logic */}
        <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl shadow hover:shadow-lg transition duration-300 mb-10 px-6 py-4">
          <h3 className="text-xl font-bold text-blue-700 mb-4">
            🔻 Wants Deduction Strategy
          </h3>
          <p className="text-gray-700 mb-4">
            MoneyMapr prioritizes and trims unnecessary spending from your{" "}
            <span className="font-semibold">Wants</span> to help balance your
            budget.
          </p>

          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-100 text-blue-800">
                <th className="py-2 px-4 border">Priority</th>
                <th className="py-2 px-4 border">Importance</th>
                <th className="py-2 px-4 border">Deduction %</th>
              </tr>
            </thead>
            <tbody>
              {[
                [5, "Highest", "10%"],
                [4, "High", "20%"],
                [3, "Medium", "30%"],
                [2, "Low", "40%"],
                [1, "Lowest", "50%"],
              ].map(([priority, importance, deduction]) => (
                <tr
                  key={priority}
                  className="text-center hover:bg-blue-100 transition"
                >
                  <td className="py-2 px-4 border">{priority}</td>
                  <td className="py-2 px-4 border">{importance}</td>
                  <td className="py-2 px-4 border">{deduction}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="mt-4 text-sm text-gray-600 italic">
            Higher priority means lesser deduction to preserve important
            expenses.
          </p>
        </div>

        {/* Savings Logic */}
        <div className="bg-purple-50 border border-purple-200 p-6 rounded-xl shadow hover:shadow-lg transition duration-300">
          <h3 className="text-xl font-bold text-purple-700 mb-4">
            💰 Savings Allocation Strategy
          </h3>
          <p className="text-gray-700 mb-4">
            Once your budget is balanced, remaining funds are distributed to
            savings categories like Emergency, Retirement, and Investments based
            on your chosen priorities.
          </p>

          <p className="bg-purple-100 p-4 rounded text-purple-900 font-mono text-sm overflow-x-auto">
            For each saving category:
            <br />
            <strong>
              (Priority × Total Amount to Allocate) / Sum of All Priorities
            </strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
