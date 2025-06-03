import { useState, useEffect } from "react"
import Form from './Form'
import TodoList from "./TodoList"
import Footer from "./Footer"
import todoService from '../services/todos'
import LoginForm from "./LoginForm"

export default function Todo() { 

    //when state is used by two components
    //The state should be placed in the parrent component. 
    //and passed ass props to the components
    //form and todolist component uses this bellow state
    
    const [todos, setTodos] = useState([])
    
    const [user, setUser] = useState(null)  
        
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedTodoAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            todoService.setToken(user.token)
        }
    }, [])
    
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

    //const user = JSON.parse(window.localStorage.getItem('loggedTodoAppUser'))
    return (
        <div>
            {user === null 
                ? <LoginForm setUser={setUser} /> 
                : <div>
                    <Form todos={todos} setTodos={setTodos} />
                    <TodoList todos={todos} setTodos={setTodos} />
                    <Footer
                        completedTodos={completedTodos}
                        totalTodos={totalTodos}
                        remainingTodos={remainingTodos}
                    />
                </div>
            }    
        </div>
    )
}