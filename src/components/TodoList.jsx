import { useState } from "react"
import TodoItem from "./TodoItem"
import styles from './todolist.module.css'
import todoService from '../services/todos'
import MessagePrompt from './MessagePrompt'



export default function TodoList({ todos, setTodos }) {

    const [message, setMessage] = useState('')

    const sortedTodos = todos.slice().sort((a, b) => Number(a.done) - Number(b.done))
    const toggleImportance = (id) => {
        const todo = todos.find(n => n.id === id)
        const updateTodo = { ...todo, important: !todo.important } 
        
        todoService
            .update(id,updateTodo)
            .then(todoToBeUpdated => {
                setTodos(todos.map(n => n.id === id ? todoToBeUpdated : n))
                banner(
                    todoToBeUpdated.important
                        ? "Item is now important"
                        : "Item is now not important"
                )
            })
    }
    const toggleDone = (id) => {
        const todo = todos.find(n => n.id === id)
        const updateTodo = { ...todo, done: !todo.done}
        
        todoService
            .update(id,updateTodo)
            .then(todoToBeUpdated => {
                setTodos(todos.map(n => n.id === id ? todoToBeUpdated : n))
                banner(                        
                    todoToBeUpdated.done
                        ? 'Item listed as done'
                        : 'Item listed as not done'
                )
            })
    }
    const handleDelete = (id) => {
        const deleteConfirm = window.confirm('Are you sure to delete this?')
        if(!deleteConfirm) return
        todoService
            .remove(id)
            .then(() => {
                //Make sure to compare ids to the id parameter 
                //or else it will not delete until pages is freshed
                setTodos(todos.filter(item => item.id !== id)) 
                banner('item got deleted')
            })
        
    }

    const banner = (msg) => {
        setMessage(msg)
        setTimeout(() => {
            setMessage('')
        }, 5000)
    }
    return (
        <div className={styles.list}>
            <MessagePrompt message={message} />
            {sortedTodos.map(todo =>
                <TodoItem
                    key={todo.name}
                    todo={todo}
                    todos={todos}
                    setTodos={setTodos}
                    toggleImportance={() => toggleImportance(todo.id)}
                    toggleDone={() => toggleDone(todo.id)}
                    handleDelete={() => handleDelete(todo.id)}
                    banner={banner}
                />)}
        </div>
    )
}