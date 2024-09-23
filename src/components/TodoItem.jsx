import styles from './todoitem.module.css'
export default function TodoItem({ todo, todos, setTodos }) {

    function handleDelete(todo) {
        setTodos(todos.filter(item => item !== todo))
    }

    function handleClick(name) {
        setTodos(todos.map(item => 
            item.name === name ? {...todo, done:!item.done} : item
        ))
        
    }

    //const doneStatus = todo.done ? styles.completed : ''

    return (
        <div className={styles.item}>
            <div className={styles.itemName}>
                <span className={todo.done ? styles.completed : ''}
                    onClick={() => handleClick(todo.name)} >
                    {todo.name}
                </span>
                <span>
                    <button
                        onClick={() => handleDelete(todo)}
                        className={styles.deleteButton}
                    >X</button>
                </span>
            </div>
            
            <hr className={styles.line} />
        </div>
    )
}