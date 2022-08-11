import React from 'react';
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions
} from 'react-swipeable-list'
import "react-swipeable-list/dist/styles.css"

import { formatDate } from './helpers';

import savingsIcon from '../img/icono_ahorro.svg'
import houseIcon from '../img/icono_casa.svg'
import foodIcon from '../img/icono_comida.svg'
import expensesIcon from '../img/icono_gastos.svg'
import leisureIcon from '../img/icono_ocio.svg'
import healthIcon from '../img/icono_salud.svg'
import subscriptionsIcon from '../img/icono_suscripciones.svg'

const diccionaryIcons = {
  savings: savingsIcon,
  food: foodIcon,
  house: houseIcon,
  expenses: expensesIcon,
  leisure: leisureIcon,
  health: healthIcon,
  subscriptions: subscriptionsIcon
}

const Expense = ({expense, setEditExpense, eliminateExpense}) => {
  const { category,name, amount, id, date } = expense

  const leadingActions = () =>(
    <LeadingActions>
      <SwipeAction onClick={() => setEditExpense(expense)}>
        Editar
      </SwipeAction>
    </LeadingActions>
  )

  const trailingActions = () =>(
    <TrailingActions>
    <SwipeAction 
        onClick={() => eliminateExpense(id)}
        destructive={true}
    >
      Eliminar
    </SwipeAction>
  </TrailingActions>
  )

  return(
    
    <SwipeableList>
      <SwipeableListItem
          leadingActions={leadingActions()}
          trailingActions={trailingActions()}
      >
    <div className='expense shadow'>
      <div className='content-expense'>
        <img src={diccionaryIcons[category]} alt="Icons-expenses" />
        <div className="description-expense">
          <p className='category'>{category}</p>
          <p className='name-expense'>{name}</p>
          <p className='date-expense'>
            Agregando el: {''}
            <span>{formatDate(date)}</span>
          </p>
        </div>
      </div>

      <p className="amount-expense">$ {amount} </p>
    </div>
      </SwipeableListItem>
    </SwipeableList>
  )
};

export default Expense
