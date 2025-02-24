import { useState, useEffect } from "react"
import Form from './Form'
import TodoList from "./TodoList"
import Footer from "./Footer"
import todoService from '../services/todos'

export default function Todo() { 

    //when state is used by two components
    //The state should be placed in the parrent component. 
    //and passed ass props to the components
    //form and todolist component uses this bellow state
    
    const [todos, setTodos] = useState([])
    
    //In order to fetch data from the server we need to use useEffect hook
    //import the useEffect hook as useState was imported
    useEffect(() => {
        todoService
            .getAll()
            .then(allTodos => {
                setTodos(allTodos)  
            })
    }, [])

    //List the todos with status done = true
    //item.done by default means items status is equal to true
    const completedTodos = todos.filter(item => item.done).length
    const totalTodos = todos.length
    const remainingTodos = completedTodos == 0 ? totalTodos : totalTodos-completedTodos

    return <div>
        <Form todos={todos} setTodos={setTodos} />
        <TodoList todos={todos} setTodos={setTodos} />
        <Footer
            completedTodos={completedTodos}
            totalTodos={totalTodos}
            remainingTodos={remainingTodos}
        />
    </div>
}