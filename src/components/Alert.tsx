import { useEffect } from 'react'
import { Todo } from './types'



type AlertProps = {
  type: string;
  msg: string;
  removeAlert: () => void;
  todos: Todo[]
}

const Alert = ({ type, msg, removeAlert, todos }: AlertProps) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      removeAlert()
    }, 2000)
    return () => clearTimeout(timer)
  }, [todos])


  return (
    <p className={`${type === 'success' ? 'text-green-500' : 'text-red-500'} text-lg`}>{msg}</p>
  )
}

export default Alert