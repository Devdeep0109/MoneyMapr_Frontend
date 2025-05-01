import React from "react";
import { useBudget } from "../context/BudgetContext";
import { AlertTriangle } from "lucide-react";

const SuggestionPage = () => {
  const { resultData, budgetInputs } = useBudget();
  const flattenedResultData = resultData?.flat() || [];

  const formatLabel = (key) =>
    key
      .replace(/([A-Z])/g, " $1")
      .replace(/Amount$/, "")
      .trim()
      .replace(/^./, (str) => str.toUpperCase());

  const needs = [
    "housingAmount",
    "foodAmount",
    "transportationAmount",
    "utilitiesAmount",
    "insuranceAmount",
    "loanPaymentsAmount",
    "childCareAmount",
  ];

  const wants = [
    "subscriptionsAmount",
    "travelAmount",
    "entertainmentAmount",
    "diningOutAmount",
    "luxuryShoppingAmount",
    "gymAmount",
  ];

  const savings = [
    "emergencyFundAmount",
    "retirementAmount",
    "realEstateAmount",
  ];

  const getBackendSuggestion = (field) => {
    const match = flattenedResultData.find((item) => item.name === field);
    return match ? parseFloat(match.value).toFixed(2) : null;
  };

  const renderItem = (field, type) => {
    const label = formatLabel(field);
    const original = parseFloat(budgetInputs[field]) ?? 0;
    const suggested = getBackendSuggestion(field);
    const hasChange = suggested !== null && parseFloat(suggested) > 0;

    let bgColor = "";
    let innerBgColor = "";
    let borderColor = "";

    if (type === "need") {
      bgColor = "bg-blue-100"; // outer
      innerBgColor = "bg-[#E3F2FD]"; // inner
      borderColor = "border-blue-300";
    } else if (type === "want") {
      // eslint-disable-next-line no-unused-vars
      bgColor = "bg-green-100";
      innerBgColor = "bg-[#E8F5E9]";
      borderColor = "border-green-300";
    }

    return (
      <div
        key={field}
        className={`relative ${innerBgColor} ${borderColor} border rounded-lg p-4 shadow-sm hover:shadow-lg transition duration-300 ease-in-out`}
      >
        <p className="text-lg font-semibold text-gray-800">{label}</p>
        <p className="mt-2 font-bold text-gray-700">
          Original Amount: ₹{original.toFixed(2)}
        </p>
        {hasChange ? (
          <p className="text-sm text-red-600 mt-2 flex items-center gap-2">
            To Reduce: ₹{suggested}
            {type === "need" && (
              <AlertTriangle size={16} className="text-yellow-500" />
            )}
          </p>
        ) : (
          <p className="text-sm text-gray-600 mt-2">No Change</p>
        )}
      </div>
    );
  };

  const renderSavingItem = (field) => {
    const label = formatLabel(field);
    const original = parseFloat(budgetInputs[field]) ?? 0;
    const added = parseFloat(getBackendSuggestion(field)) ?? 0;
    const newAmount = original + added;

    return (
      <div
        key={field}
        className="bg-[#F3E5F5] border border-purple-300 rounded-lg p-4 shadow-sm hover:shadow-lg transition duration-300 ease-in-out"
      >
        <p className="text-lg font-semibold text-gray-800">{label}</p>
        <div className="flex flex-col sm:flex-row sm:justify-between mt-2">
          <p className="font-bold text-gray-700">
            Original Amount: ₹{original.toFixed(2)}
          </p>
          <p className="text-green-600 font-semibold">
            Amount Added: ₹{added.toFixed(2)}
          </p>
        </div>
        <p className="text-green-700 mt-2 font-medium">
          New {label} Amount: ₹{newAmount.toFixed(2)}
        </p>
      </div>
    );
  };

  if (!resultData || !budgetInputs) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-lg text-gray-700">No suggestions found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-10 px-4">
      <h2 className="text-4xl font-bold text-center text-indigo-700 mb-12">
        Personalized Budget Suggestions
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-blue-200 border border-blue-200 rounded-2xl p-6 shadow-md">
          <h3 className="text-2xl font-bold text-blue-700 mb-4 text-center">
            Needs
          </h3>
          <div className="flex flex-col gap-4">
            {needs.map((field) => renderItem(field, "need"))}
          </div>
        </div>

        <div className="bg-green-200 border border-green-200 rounded-2xl p-6 shadow-md">
          <h3 className="text-2xl font-bold text-green-700 mb-4 text-center">
            Wants
          </h3>
          <div className="flex flex-col gap-4">
            {wants.map((field) => renderItem(field, "want"))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-12 bg-purple-200 border border-purple-200 rounded-2xl p-6 shadow-md">
        <h3 className="text-2xl font-bold text-purple-700 mb-4 text-center">
          Savings
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {savings.map((field) => renderSavingItem(field))}
        </div>
      </div>
    </div>
  );
};

export default SuggestionPage;
