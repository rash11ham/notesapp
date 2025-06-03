import { useState, useEffect } from "react"
import styles from './form.module.css'
import todoService from '../services/todos'
import loginService from '../services/login'
import Header from "./Header"

export default function Form({todos, setTodos, user, setUser}) {

    //intiallly our state was an string and the value was empty ('')
    //const [todo, setTodo] = useState('')
    //we want to add additional functionality to our todo items
    //we want our todos to have status as done or not done
    //for that we need to change the value of our todo state to a 
    //object having a name string and done status of boolean
    const [todo, setTodo] = useState({
        name: '',
        done: false,
        important: false,
    })

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')  
    

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const userToSet = await loginService.login({
                username, password,
            })

            window.localStorage.setItem(
                'loggedTodoAppUser', JSON.stringify(userToSet)
            ) 

            todoService.setToken(userToSet.token)
            setUser(userToSet)
            setUsername('')
            setPassword('')
        } catch (exception) {
            setErrorMessage('Wrong credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
        
    }
    

    const addTodo = (e) => {
        e.preventDefault()
        try{
            const todoExists = todos.find(item => item.name.toLowerCase() === todo.name.toLowerCase())
            if (todoExists) {
                alert(`${todoExists.name} is already in the list try another!`)
                setTodo({name:'', done:false, important: false})
                
            }
            else {
                todoService
                    .create(todo)
                    .then(newTodo => {                    
                        setTodos([...todos, newTodo]) 
                        setTodo({name:'', done:false, important: false})
                    }).catch(error => error.response.data.error)
                    
            }
        } catch(error){
           alert(error.response.data.error)
        }
        
    }

    function handleInputChange(e) {
        //intially we had this because our state todo was a string
        //setTodo(e.target.value)
        //now our state todo is an object and we need to this 
        // e.target.value to the name property of our object
        // plus adding the done statues to false intially
        setTodo({name:e.target.value, done: false, important: false})
    }

    const todoForm = () => (
        <form key={todo.id} className={styles.todoForm} onSubmit={addTodo}>
            <div className={styles.inputContainer}>
                <input
                    className={styles.modernInput}
                    onChange={handleInputChange}
                    // change the value to todo.name
                    //because now our value object.name
                    value={todo.name}
                    type="text"
                    placeholder="Enter todos here..."
                />
                <button className={styles.modernButton} type="submit">Add</button>
            </div>    
        </form>
    )

    const loginForm = () => (
        <form key={user} className={styles.todoForm} onSubmit={handleLogin}>
            <div>
                username
                <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                password
                <input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button type="submit">login</button>
        </form>
    )

    

    
    return (
        <div>
            <Header user={user}/>
            {todoForm()}
        </div>       
    )
}