//Generate a id en base a numeros ramdon + una fecha

export const generateId = () => {
  const random = Math.random().toString(36).substring(2)
  const date = Date.now().toString(36)
  return random + date
}

//El formato el cual tendra la fecha

export const formatDate = date => {
  const newDate = new Date(date);

  const options = {
    year: 'numeric',
    month: 'long',
    day: '2-digit'
  }
  return newDate.toLocaleDateString('en-US', options)
}