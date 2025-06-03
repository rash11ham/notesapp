import { useState } from 'react'
import styles from './header.module.css'

export default function Header({ user }) {

    const [currentUser, setCurrentUser] = useState(user)

    const logUser = JSON.parse(window.localStorage.getItem('loggedTodoAppUser'))
    
    const logout = () => {
        if(logUser) {
            setCurrentUser(null)
        }
        window.localStorage.removeItem('loggedTodoAppUser')
        
    }
    
    return <div className={styles.header}>
        
        <p className={styles.note}>Notes</p>
        
        {logUser !== null ? 
            <button className={styles.logoutButton} onClick={logout}>Logout</button> : ""
        }
        <p className={styles.userName}>{logUser !== null ? `Hello ${logUser.name}` : ''}</p>

        
    </div>
}