import { NextComponentType } from 'next'
import styles from '../styles/Login.module.css'

const Login: NextComponentType = () => {
    return (
        <div className={styles.container}>
            <h2 className={styles.titleLogin}>Log in</h2>
            <p>Please log in to proceed.</p>
            <form className={styles.form}>
                <img alt='logo'></img>
                <input type='email' placeholder='Correo' className={styles.inputLogin}></input>
                <input type='password' placeholder='Contraseña' className={styles.inputLogin}></input>
                <button className={styles.buttonLogin}>Log in</button>
                <button className={styles.buttonLogin}>Google</button>
            </form>
            <div className={styles.secondContainer}>
                <button>Sign Up</button>
                <button>Forgot Password</button>
            </div>
        </div>
    )
}
export default Login
