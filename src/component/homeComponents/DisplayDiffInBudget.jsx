import React from "react";
import { ArrowDown, ArrowUp } from "lucide-react";

const DisplayDiffInBudget = ({ backendDiff, onNavigate }) => {
  if (!backendDiff) return null;

  return (
    <div className="bg-red-50   w-full ">
      <h2 className="text-xl font-bold mb-2 text-red-700">
        📉 Difference from Ideal Budget
      </h2>
      <ul className="text-gray-800 list-disc pl-5 space-y-2">
        <li className="flex justify-between items-center">
          <span>
            <strong>Needs:</strong>{" "}
            {backendDiff.needs < 0 ? "Over by ₹" : "Under by ₹"}{" "}
            {Math.abs(backendDiff.needs)}
          </span>
          {backendDiff.needsMet ? (
            <ArrowUp className="text-green-500" />
          ) : (
            <ArrowDown className="text-red-500" />
          )}
        </li>
        <li className="flex justify-between items-center">
          <span>
            <strong>Wants:</strong>{" "}
            {backendDiff.wants < 0
              ? `Over by ₹${Math.abs(backendDiff.wants)}`
              : `Under by ₹${Math.abs(backendDiff.wants)}`}
          </span>
          {backendDiff.wantsMet ? (
            <ArrowUp className="text-green-500" />
          ) : (
            <ArrowDown className="text-red-500" />
          )}
        </li>
        <li className="flex justify-between items-center">
          <span>
            <strong>Savings:</strong>{" "}
            {backendDiff.savings > 0 ? "Over by ₹" : "Under by ₹"}{" "}
            {Math.abs(backendDiff.savings)}
          </span>
          {backendDiff.savingsMet ? (
            <ArrowUp className="text-green-500" />
          ) : (
            <ArrowDown className="text-red-500" />
          )}
        </li>
      </ul>

      <div className="mt-4 text-center">
        {backendDiff.needsMet &&
        backendDiff.wantsMet &&
        backendDiff.savingsMet ? (
          <p className="text-green-700 font-semibold text-lg">
            🎉 Well done! Your budget is Good.
          </p>
        ) : (
          <button
            onClick={onNavigate}
            className="mt-2 bg-yellow-400 text-black px-4 py-2 rounded-md font-semibold hover:bg-yellow-500"
          >
            ⚠️ Fill Elaborate Budget
          </button>
        )}
      </div>
    </div>
  );
};

export default DisplayDiffInBudget;
