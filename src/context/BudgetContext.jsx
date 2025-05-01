// context/BudgetContext.jsx
import React, { createContext, useContext, useState } from "react";

const BudgetContext = createContext();

export const BudgetProvider = ({ children }) => {
  const [userSalary, setUserSalary] = useState(0);
  const [userNeeds, setUserNeeds] = useState(0);
  const [userWants, setUserWants] = useState(0);
  const [userSavings, setUserSavings] = useState(0);
  const [resultData, setResultData] = useState(null);

  // ✅ Add this new state to store all elaborate inputs
  const [budgetInputs, setBudgetInputs] = useState({});

  return (
    <BudgetContext.Provider
      value={{
        userSalary,
        setUserSalary,
        userNeeds,
        setUserNeeds,
        userWants,
        setUserWants,
        userSavings,
        setUserSavings,
        resultData,
        setResultData,
        budgetInputs,
        setBudgetInputs,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudget = () => useContext(BudgetContext);
