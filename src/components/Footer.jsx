import styles from './footer.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faList, faRegistered } from '@fortawesome/free-solid-svg-icons'


export default function Footer({ completedTodos, totalTodos, remainingTodos }) {
    return (
        <div className={styles.footer}>
            <span className={styles.item}>
                 {completedTodos} <FontAwesomeIcon icon={faCheckCircle} />
            </span>
            <span className={styles.item}>
                 {totalTodos} <FontAwesomeIcon icon={faList} />
            </span>
            <span className={styles.item}>
                 {remainingTodos} <FontAwesomeIcon icon={faRegistered} />
            </span>
        </div>
    )
    
}