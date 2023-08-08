import { useEffect, useState } from "react"
import { Todo } from "./components/types"
import Alert from "./components/Alert"
import Todos from "./components/Todos"


/*-------GetLocalStorageTodos-------*/
const getLocalStorateTodos = (): Todo[] | [] => {
  const todos = localStorage.getItem('todos')
  if (todos) {
    return JSON.parse(todos)
  } else {
    return []
  }
}



/*-------App-Component-------*/
const App = () => {
  const [inputValue, setInputValue] = useState('')
  const [todos, setTodos] = useState<Todo[]>(getLocalStorateTodos())
  const [isEditing, setIsEditing] = useState(false)
  const [editId, setEditId] = useState<number | null>(null)
  const [alert, setAlert] = useState({ show: false, type: '', msg: '' })
  


  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])


  /*-------Handle-Submit-------*/
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!inputValue) {
      showAlert(true, 'danger', 'Please Fill The Input')

    } else if (inputValue && isEditing) {
        setTodos(todos.map(todo => {
          if (todo.id === editId) {
            return { ...todo, title: inputValue }
          } 
          return todo
        }))
        setInputValue('')
        setIsEditing(false)
        setEditId(null)
        showAlert(true, 'success', 'Todo Changed!')

    } else {
        const newTodo = { id: new Date().getTime(), title: inputValue }
        setTodos([newTodo, ...todos])
        showAlert(true, 'success', 'Todo Added!')
        setInputValue('')
    }
  }


  /*-------Show-Alert-------*/
  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg })
  }


  /*-------Remove-Todo-------*/
  const removeTodo = (id: number) => {
    showAlert(true, 'danger', 'Todo Removed')
    setTodos(todos.filter(todo => todo.id !== id))
  }


  /*-------Edit-Todo-------*/
  const editTodo = (id: number, title: string) => {
    setIsEditing(true)
    setEditId(id)
    setInputValue(title)
  }


  /*-------Clear-All-Todos-------*/
  const clearAllTodos = () => {
    showAlert(true, 'danger', 'All Todos Have Been Removed')
    setTodos([])
  }



  return (
    <main className='w-full h-screen flex flex-col items-center p-4 pt-20'>

      <div className="w-full max-w-[500px]">

        {/*-------Alert-------*/}
        <div className="h-[50px] w-full text-center">
          { alert.show && <Alert {...alert} removeAlert={showAlert} todos={todos} />}
        </div>
        

        {/*-------Form-------*/}
        <form onSubmit={handleSubmit} className="flex">
          <input 
            type='text' 
            placeholder="Todo..." 
            value={inputValue} 
            onChange={(e) => setInputValue(e.target.value)} 
            className='flex-1 p-3 py-4 border-none outline-none text-black'
          />
          <button className={`${!isEditing ? 'bg-green-500 p-2 transition-colors hover:bg-green-600' : 'bg-orange-500 p-2 transition-colors hover:bg-orange-600'} `}>
            {isEditing ? 'Edit Todo' : 'Add Todo'}
          </button>
        </form>
        

        {/*-------Todos-------*/}
        {
          todos.length === 0
            ? <h3 className="text-center py-4">no Todos</h3>
            : (
                <>
                  <Todos todos={todos} editTodo={editTodo} removeTodo={removeTodo} />
                  <button onClick={() => clearAllTodos()} className='p-3 mx-auto bg-red-500 my-3 rounded transition-colors hover:bg-red-600'>clear All</button>
                </>
              )
        }

      </div>

    </main>
  )
}

export default App
