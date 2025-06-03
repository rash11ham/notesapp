import { useState, useEffect } from "react"
import todoService from '../services/todos'
import loginService from '../services/login'
import styles from './loginform.module.css'
import Header from "./Header"

const LoginForm = ({ user, setUser }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    //const [currentUser, setCurrentUser] = useState(user)
    

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedTodoAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)         
            setUser(user)
            todoService.setToken(user.token)
            //console.log(user)
        }
    }, [])

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
            console.log(userToSet)
            setUsername('')
            setPassword('')
          } catch (exception) {
            setErrorMessage('Wrong credentials')
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          }
    }


    return (
        
        <div>
            <Header user={user} />
            <form key={user} className={styles.loginForm} onSubmit={handleLogin}>
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
        </div>
    )

}

export default LoginForm