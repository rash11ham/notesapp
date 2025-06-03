import styles from './todoitem.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'


<<<<<<< HEAD
export default function TodoItem({ todo, toggleImportance, toggleDone, handleDelete }) {

=======


export default function TodoItem({ todo, toggleImportance, toggleDone, handleDelete }) {

>>>>>>> 5f93d34acf0123f67804239fbd494993f5ff134e
    const important = todo.important
        ? <FontAwesomeIcon icon={ faStar } /> : <FontAwesomeIcon icon={faHeart} />

    return (
        <div className={styles.item}>
            {todo.important
                ? <div className={styles.itemName}>
                    <span>
                    <button
                        onClick={toggleImportance}
                        className={styles.importantButton}
                    >{important}</button>
                </span>
                </div>
                : <div className={styles.itemName}>                    
                    <span>
                        <button
                            onClick={handleDelete}
                            className={styles.deleteButton}
                        >X</button>
                    </span>
                    
                    <span>
                        <button
                            onClick={toggleImportance}
                            className={styles.importantButton}
                        >{important}</button>
                    </span>
                </div>}
                <div className={styles.itemName}>
                    <span className={todo.done ? styles.completed : ''}
                        onClick={toggleDone} >
                        {todo.name}
                    </span>
                </div>
            
            <hr className={styles.line} />
        </div>
    )
}