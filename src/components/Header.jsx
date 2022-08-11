import React from 'react';
import NewBudget from './NewBudget';
import ControlBudget from './ControlBudget';

const Header = ({
  expenses,
  setExpenses,
  budget, 
  setBudget, 
  isValidBudget, 
  setIsValidBudget
}) => {
  return(
    <header>
      <h1>Expense Planner</h1>

      {isValidBudget ? (
        <ControlBudget 
          expenses={expenses}
          setExpenses={setExpenses}
          budget={budget}
          setBudget={setBudget}
          setIsValidBudget={setIsValidBudget}
        />
      ) : (
        <NewBudget 
          budget={budget}
          setBudget={setBudget}
          setIsValidBudget={setIsValidBudget}  
  />
      )}
    
    </header>
  )
};

export default Header;
