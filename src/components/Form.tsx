import { ChangeEvent, FormEvent, useEffect } from "react";
import { Todo } from "./App";
import { v4 as uuidv4 } from 'uuid';

export interface FormProps {
    input: string;
    setInput: (input: string) => void;
    todos: Todo[];
    setTodos: (todos: Todo[]) => void;
    editTodo: Todo | null;
    setEditTodo: (editTodo: Todo | null) => void;
  }

const Form = ({input, setInput, todos, setTodos, editTodo, setEditTodo}: FormProps) => {

    const updateTodo = (title: string, id: string, completed: boolean) => {
        const newTodo = todos.map((todo) => {
            return todo.id === id ? { title, id, completed } : todo;
        });
        setTodos(newTodo);
        setEditTodo(null);
    };
    useEffect(() => {
        if (editTodo) {
            setInput(editTodo.title);
        } else {
            setInput("")
        }
    }, [setInput, editTodo]);  

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {    
        setInput(e.target.value);

    }

    const handleFormSubmit = (e: FormEvent) => {
        e.preventDefault();
        if(!editTodo) {
            setTodos([...todos, {id: uuidv4(), title: input, completed:false}]);
            console.log(todos);
        } else {
            updateTodo(input, editTodo.id, editTodo.completed)
        }

        setInput('');
    }

    return ( 
        <form onSubmit={handleFormSubmit}>
            <input type="text" 
            placeholder="Enter a Todo..." 
            className="task-input"
            value={input}
            required
            onChange={handleInput} />
            <button className="button-add" type="submit">
                {editTodo ? "OK" : "Add"}
            </button>
        </form>
    )
}

export default Form; 