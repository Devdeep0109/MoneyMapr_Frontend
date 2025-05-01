import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ArrowDown, ArrowUp } from "lucide-react";
import DisplayDiffInBudget from "./DisplayDiffInBudget";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

const Graph = ({ idealBudget, userBudget, backendDiff, onNavigate }) => {
  const idealData = [
    { name: "Needs", value: idealBudget.need },
    { name: "Wants", value: idealBudget.want },
    { name: "Savings", value: idealBudget.save },
  ];

  const userData = [
    { name: "Needs", value: userBudget.need },
    { name: "Wants", value: userBudget.want },
    { name: "Savings", value: userBudget.save },
  ];

  return (
    <>
      <div className="mt-8 w-full  bg-white p-6 rounded-lg shadow-md mx-4 sm:mx-8 md:mx-0">
        <h2 className="text-xl font-bold text-center text-black mb-4">
          Budget Comparison (Pie Charts)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col items-center">
            <h3 className="font-semibold text-green-700 mb-2">Ideal Budget</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={idealData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {idealData.map((_, i) => (
                    <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-col items-center">
            <h3 className="font-semibold text-blue-700 mb-2">Your Budget</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={userData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#82ca9d"
                  label
                >
                  {userData.map((_, i) => (
                    <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="mt-8 w-full  bg-red-50  p-6 rounded-lg shadow-md mx-4 sm:mx-8 md:mx-0 ">
        {backendDiff && (
          <DisplayDiffInBudget
            backendDiff={backendDiff}
            onNavigate={onNavigate}
          />
        )}
      </div>
    </>
  );
};

export default Graph;
