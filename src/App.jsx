import { useState, useEffect } from 'react'
import Header from './components/Header'
import Modal from './components/Modal'
import Filter from './components/Filter'
import ListExpenses from './components/ListExpenses'
import { generateId } from './components/helpers'
import IconoNuevoexpense from './img/nuevo-gasto.svg'


function App() {

  //Store expense in the LocalStorage
  const [expenses, setExpenses] = useState(
    localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses')) : []
  )

  //Store budget in the LocalStorage
  const [budget, setBudget] = useState(
    Number(localStorage.getItem('budget')) ?? 0
  )

  //if the budget is valid will be open the window of controlBudget
  const[isValidBudget, setIsValidBudget] = useState(false);

  const[modal, setModal] = useState(false)
  const[animateModal, setAnimateModal] = useState(false)

  const [editExpense, setEditExpense] = useState({})

  const [filter, setFilter] = useState('')
  const [leakedExpenses, setLeakedExpenses] = useState([])

  //To edit an expense already done
  useEffect(() =>{
    
    //If there is a key in the object, the modal will be opened for make a edit 
    if(Object.keys(editExpense).length > 0)
    setModal(true)

    setTimeout(() =>{
      setAnimateModal(true)
    }, 500)
  }, [editExpense])

  //This function will detect any change in LocalStorage budget
  useEffect(() =>{
    localStorage.setItem('budget', budget ?? 0)
  }, [budget])

  //This function will detect any change in LocalStorage expenses

  useEffect(() =>{
    //It will convert the array to string to be able to store the data in LocalStorage
    localStorage.setItem('expenses', JSON.stringify(expenses) ?? [])
  }, [expenses])

  //Expense filter
  useEffect(() =>{
    if(filter){
      const leakedExpenses = expenses.filter( expense => expense.category === filter)
      setLeakedExpenses(leakedExpenses)
    }
  },[filter])

  //Validate if there is already an existing budget
  useEffect(() =>{
    const budgetLS = localStorage.getItem('budget') ?? 0;

    //If the budget > 0 you will show the expenses previously saved
    if(budgetLS > 0){
      setIsValidBudget(true)
    }
  }, [])

  const handleNewExpense = () =>{
    //The modal will open to create a new expense
    setModal(true)

    setEditExpense({})

    setTimeout(() =>{
      setAnimateModal(true)
    }, 500)
  }

  const saveExpense = expense => {
    if(expense.id){
     // Update expenses
      const expensesActualizados = expenses.map( expensestate => expensestate.id === expense.id ? expense : expensestate)
      setExpenses(expensesActualizados)
      setEditExpense({})
    } else {
      //New expense
      expense.id = generateId() //generate id of the new expense
      expense.date = Date.now(); //Add date of the expense
      setExpenses([...expenses, expense ]) // store expenses and the new expense
    }
      
    setAnimateModal(false) //To make a transition that the modal is closing
  
    setTimeout(()=>{
      setModal(false)
    }, 500)
  }

  //to delete an expense
  const eliminateExpense = id => {
    //Take the id of the expense and renderize the rest of expenses except the expense taken
    const expensesActualizados = expenses.filter( expense => expense.id !== id)

    //update the expenses except the one that I take the id
    setExpenses(expensesActualizados);
    }

  return (
    <div className={modal ? 'set' : ''}> {/*If the modal is active, the set class will be put*/}
    <Header 
      expenses={expenses}
      setExpenses={setExpenses}
      budget={budget}
      setBudget={setBudget}
      isValidBudget={isValidBudget}
      setIsValidBudget={setIsValidBudget}
    />

{/*If the budget is valid, the window to create expenses will open. */}
    {isValidBudget && (
      <>
      <main>

      <Filter
      filter={filter}
      setFilter={setFilter}
      />

      <ListExpenses
          expenses={expenses}
          setEditExpense={setEditExpense}
          eliminateExpense={eliminateExpense}
          filter={filter}
          leakedExpenses={leakedExpenses}
      />
      </main>
          <div className='new-expense'>
          <img src={IconoNuevoexpense} 
               alt='Icono nuevo expense'
               onClick={handleNewExpense}
          />
        </div>
      </>
    )}

    
    {modal && <Modal 
                setModal={setModal}
                animateModal={animateModal}
                setAnimateModal={setAnimateModal}
                saveExpense={saveExpense}
                editExpense={editExpense}
                setEditExpense={setEditExpense}
               />
               }
    </div>
  )
  }


export default App
