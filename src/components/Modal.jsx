import { useState, useEffect } from 'react';
import closeBtn from '../img/cerrar.svg'
import Message from './Message';

const Modal = ({ 
  setModal, 
  animateModal, 
  setAnimateModal, 
  saveExpense, 
  editExpense,
  setEditExpense
}) => {

  const [message, setMessage] = useState('')

  const [name, setName] = useState('')
  const [amount, setAmount] = useState(0)
  const [category, setCategory] = useState('')
  const [date, setDate] = useState('')
  const [id, setId] = useState('')
  
  //If it finds any key it will change the variables by editExpense
  useEffect(() =>{
    if(Object.keys(editExpense).length > 0){
      setName(editExpense.name)
      setAmount(editExpense.amount)
      setCategory(editExpense.category)
      setId(editExpense.id)
      setDate(editExpense.date)
    }

  }, [])


  const hideModal = () => {
    setAnimateModal(false)
    setEditExpense


    setTimeout(()=>{
      setModal(false)
    }, 500)
  }

  //Validation of the expense
  const handleSubmit = e => {
    e.preventDefault();

    if([ name, amount, category].includes('')){
      setMessage('Todos los fields son obligatorios')

      setTimeout(() => {
        setMessage('')
      }, 2000);

      return;
        }

        saveExpense({name, amount, category, id, date})

  }

  return(
    <div className='modal'>
      <div className='close-modal'>
        <img src={closeBtn}
             alt="close modal"
             onClick={hideModal}
        />
      </div>

      <form 
            onSubmit={handleSubmit}
            className={`form ${animateModal ? "animate" : "close"}`}
            >
        <legend>{editExpense.name ? 'Editar expense' : 'Nuevo expense'}</legend>
        {message && <Message tipo="error">{message}</Message>}

        <div className="field">
          <label htmlFor="name">name expense</label>

          <input 
                id='name'
                type="text" 
                placeholder='Añade el name del expense'
                value={name}
                onChange={ e => setName(e.target.value)}
            />

        </div>

        <div className="field">
          <label htmlFor="amount">amount</label>

          <input 
                id='amount'
                type="number" 
                placeholder='Añade la amount del expense: ej. 300'
                value={amount}
                onChange={ e => setAmount(Number(e.target.value))}
                />
        </div>

        <div className="field">
          <label htmlFor="category">category</label>

          <select 
              id="category"
              value={category}
              onChange={ e => setCategory(e.target.value)}
              >
                <option value="">--Seleccione</option>
                <option value="savings">savings</option>
                <option value="food">food</option>
                <option value="house">house</option>
                <option value="expenses">expenses Varios</option>
                <option value="ocio">Ocio</option>
                <option value="health">health</option>
                <option value="subscriptions">subscriptions</option>
              </select>
        </div>

        <input 
          type="submit"
          value={editExpense.name ? 'Guardar Cambio' : 'Añadir expense'}
        />

      </form>
    </div>
  )
};

export default Modal;
