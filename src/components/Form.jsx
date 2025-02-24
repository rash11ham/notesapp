import { useState } from "react"
import styles from './form.module.css'
import todoService from '../services/todos'

export default function Form({todos, setTodos}) {

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
    

    const addTodo = (e) => {
        e.preventDefault()
        const todoExists = todos.find(item => item.name.toLowerCase() === todo.name.toLowerCase())
        if (todoExists) {
            alert(`${todoExists.name} is already in the list try another!`)
            setTodo({name:'', done:false, important: false})
            
        }
        // else if (todo.name === "") {
        //     alert("Nothing to add")
        // }
        else {
            todoService
                .create(todo)
                .then(newTodo => {                    
                    setTodos([...todos, newTodo]) 
                    setTodo({name:'', done:false, important: false})
                }).catch(error => error.response.data.error)
                
        }
        
    }

    function handleInputChange(e) {
        //intially we had this because our state tod was a string
        //setTodo(e.target.value)
        //now our state todo is an object and we need to this 
        // e.target.value to the name property of our object
        // plus adding the done statues to false intially
        setTodo({name:e.target.value, done: false, important: false})
    }

    return (
        
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
}