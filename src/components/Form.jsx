import { useState } from "react"
import styles from './form.module.css'

export default function Form({todos, setTodos}) {

    //intiallly our state was an string and the value was empty ('')
    //const [todo, setTodo] = useState('')
    //we want to add additional functionality to our todo items
    //we want our todos to have status as done or not done
    //for that we need to change the value of our todo state to a 
    //object having a name string and done status of boolean
    const [todo, setTodo] = useState({name:'', done:false}) 

    function handleSubmite(e) {
        e.preventDefault()
        setTodos([...todos, todo])
        setTodo({name:'', done:false})
    }

    function handleInputChange(e) {
        //intially we had this because our state tod was a string
        //setTodo(e.target.value)
        //now our state todo is an object and we need to this 
        // e.target.value to the name property of our object
        // plus adding the done statues to false intially
        setTodo({name:e.target.value, done: false})
    }

    return (
        
        <form className={styles.todoForm} onSubmit={handleSubmite}>
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