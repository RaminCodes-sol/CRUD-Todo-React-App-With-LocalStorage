import { Todo } from "./types"
import { AiTwotoneEdit } from "react-icons/ai"
import { BsTrash2Fill } from "react-icons/bs"


type TodosProps = {
    todos: Todo[];
    removeTodo: (id: number) => void;
    editTodo: (id: number, title: string) => void;
}


const Todos = ({ todos, removeTodo, editTodo }: TodosProps) => {
  return (
    <section>
        {
            todos?.map(todo => {
                return (
                    <div key={todo.id} className="w-full flex px-2 py-3 items-center gap-3">
                        <h2 className="flex-1 text-xl">{todo.title}</h2>
                        <button onClick={() => editTodo(todo.id, todo.title)} className="text-2xl bg-orange-500 p-2 rounded"><AiTwotoneEdit /></button>
                        <button onClick={() => removeTodo(todo.id)} className="text-2xl bg-red-500 p-2 rounded"><BsTrash2Fill /></button>
                    </div>
                )
            })
        }
    </section>
  )
}

export default Todos