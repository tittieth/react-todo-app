import Header from './Header'
import '../index.css'
import Form from './Form';
import { useEffect, useState } from 'react';
import TodosList from './TodosList';

export interface Todo {
    title: string
    id: string
    completed: boolean
}

export const App = () => {

    const storedData = localStorage.getItem("todos");
    const initialTodos: Todo[] = storedData ? JSON.parse(storedData) : [];
    const [input, setInput] = useState<string>("");
    const [todos, setTodos] = useState<Todo[]>(initialTodos);
    const [editTodo, setEditTodo] = useState<Todo | null>(null);

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    return (
        <div className='container'>
            <div className='app-wrapper'>
                <div>
                    <Header></Header>
                </div>
                <div>
                    <Form 
                    input={input}
                    setInput={setInput}
                    todos={todos}
                    setTodos={setTodos}
                    editTodo={editTodo}
                    setEditTodo={setEditTodo}/>
                </div>
                <div>
                    <TodosList 
                    todos={todos} 
                    setTodos={setTodos}
                    setEditTodo={setEditTodo} />
                </div>
            </div>
        </div>
    )
}
