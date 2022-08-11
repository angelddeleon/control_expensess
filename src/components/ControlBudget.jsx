import { useState, useEffect } from "react"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ControlBudget = ({ 
  expenses,
  setExpenses,
  budget,
  setBudget,
  setIsValidbudget
}) => {

  const[percentage, setPercentage] = useState(0)
  const[available, setAvailable] = useState(0)
  const[spent, setSpent] = useState(0)

  useEffect(() =>{
    //Calculating the total spent
    const totalSpent = expenses.reduce( (total, expense) => expense.amount + total, 0)

    //Calculating the total available
    const totalAvailable = budget - totalSpent

    //Calculating the percentage spent
    const newPercentage = ((( budget - totalAvailable ) / budget) *100).toFixed(2);

    //Adding the value to the variables
    setAvailable(totalAvailable)
    setSpent(totalSpent)

    //Adding the value to the new percentage 1 second later
    setTimeout(() =>{
      setPercentage(newPercentage)
    }, 1000)

  }, [expenses])

  const formatQuantity = (quantity) => {
  //Converting the amount to a money format
   return quantity.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    })
  }

  //Function to reset app
  const handleResetApp = () => {
    const resultado = confirm('¿Deseas reiniciar budgets y expenses?')

    //If the confirm is validated, all variables will be reset
    if(resultado) {
      setExpenses([])
      setBudget(0)
      setIsValidbudget(false)
    }
  }

  return(
    <div className="container-budget container shadow two-columns">
      <div>

        <CircularProgressbar
            styles={buildStyles({
              pathColor: percentage > 100 ? '#DC2626' : '#3B82F6',
              trailColor: '#F5F5F5',
              textColor: percentage > 100 ? '#DC2626' : '#3B82F6'
            })}
            value={percentage}
            text={`${percentage}% spent`}
        />

      </div>

      <div className='content-budget'>
        <button
        className="reset-app"
        type="button"
        onClick={handleResetApp}
        >
          Reset App
        </button>
        <p>
          <span>budget:</span>{formatQuantity(budget)}
        </p>

        <p className={`${available < 0 ? 'negative' : ''}`}>
          <span>available:</span>{formatQuantity(available)}
        </p>

        <p>
          <span>spent:</span>{formatQuantity(spent)}
        </p>
      </div>
    </div>
    )
 }

export default ControlBudget;
