import { useState } from 'react';
import Message from './Message';

const NewBudget = ({ 
   budget, 
   setBudget,
   setIsValidBudget
  }) => {
  const [message, setMessage] = useState('')

  //Validate the budget to see if it is right
  const handleBudget = (e) => {
    e.preventDefault();

    //If the budget is different from a number or is less than 0, it will not be accepted.
    if(!budget || budget < 0){
      setMessage("No es un budget valido")
      return
    }
    setMessage('');
    setIsValidBudget(true);



  }

  return(
    <div className='container-budget container shadow'>

      <form onSubmit={handleBudget} className='form'>
        <div className='field'>
          <label>Define budget</label>

          <input className='nuevo-budget' 
                 type="text"
                 placeholder='add a budget'
                 value={budget}
                 onChange={ e => setBudget(Number(e.target.value))}
          />

          <input type="submit" value="Add Budget" />


          {message && <Message tipo="error">{message}</Message>}

        </div>
      </form>
    </div>
  )
};

export default NewBudget;
