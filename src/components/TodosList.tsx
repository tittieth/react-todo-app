import { Todo } from "./App";

interface Props {
    todos: Todo[];
    setTodos: (todos: Todo[]) => void;
    setEditTodo: (editTodo: Todo | null) => void;
}

const TodosList = ({todos, setTodos, setEditTodo}: Props) => {

    const handleDelete = ({ id }: Todo) => {
        setTodos(todos.filter((todo) => todo.id !== id))
    }

    const handleComplete = (todo: Todo) => {
        setTodos(todos.map((item) => {
            if (item.id === todo.id) {
                return {...item, completed: !item.completed};
            }
            return item
            })
        )
    }

    const handleEdit = ({ id }: Todo) => {
        const findTodo: Todo | undefined = todos.find((todo) => todo.id === id);
        setEditTodo(findTodo || null)
    }
    console.log(todos);
    return (
      <div>        
            {todos && todos.map((todo) => (        
                <ul key={todo.id}>
                    <li className="list-item">
                        <input type="text" value={todo.title} className={`list ${todo.completed ? "complete" : ""}`} onChange={(e) => e.preventDefault()} />
                        <div>
                            <button className="button-complete task-button" onClick={() => handleComplete(todo)}>
                                <i className="fa fa-check-circle"></i>
                            </button>
                            <button className="button-edit task-button" onClick={() => handleEdit(todo)}>
                                <i className="fa fa-edit"></i>
                            </button>
                            <button className="button-delete task-button" onClick={() => handleDelete(todo)}>
                                <i className="fa fa-trash"></i>
                            </button>
                        </div>
                    </li>
                </ul>
            ))}
      </div>
    );
};

export default TodosList;
