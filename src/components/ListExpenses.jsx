import Expense from './Expense';

const ListExpenses = ({
  expenses, 
  setEditExpense, 
  eliminateExpense,
  filter,
  leakedExpenses
  }) => {
  return(
    <div className='list-expenses container'>

      {
        filter ? (
          <>
                <h2>{leakedExpenses.length ? 'expenses' : 'There are no expenses in this category'}</h2>
                {/*Collect only the expenses of the requested category in the filter*/}
                    {leakedExpenses.map( expense =>(
                          <Expense
                              key={expense.id}
                              expense={expense}
                              setEditExpense={setEditExpense}
                              eliminateExpense={eliminateExpense}
                          />
                        ))
}
</>

          ) : (
            
            <>
            <h2>{expenses.length ? 'expenses' : 'There are no expenses yet'}</h2>
            {
            expenses.map( expense =>(
              <Expense
                  key={expense.id}
                  expense={expense}
                  setEditExpense={setEditExpense}
                  eliminateExpense={eliminateExpense}
              />
            ))
            }
            </>
 )
}

    </div>
  )
};

export default ListExpenses;
