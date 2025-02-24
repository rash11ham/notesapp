// import Swal from 'sweetalert2'
import { useState } from 'react'
import styles from './MessagePrompt.module.css'

const MessagePrompt = ({ message }) => {
    
    if (message === '') {
        return ''
    }
    return (
        <div className={styles.banner}>
            {message}
        </div>
    )
    
}

export default MessagePrompt