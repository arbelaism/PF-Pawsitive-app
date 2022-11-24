import { NextComponentType } from 'next'
import styles from '../styles/SignUp.module.css'

const SignUp: NextComponentType = () => {
    return (
        <div className={styles.containerSignUp}>
            <h2 className={styles.titleSignUp}>Sign up</h2>
            <p>Please sign up to proceed.</p>
            <form className={styles.formSignUp}>
                <img alt='logo'></img>
                <label htmlFor='Nombres'>Nombres</label>
                <input type='text' placeholder='Nombres' className={styles.inputSignUp}></input>

                <label htmlFor='Apellidos'>Apellidos</label>
                <input type='text' placeholder='Apellidos' className={styles.inputSignUp}></input>

                <label htmlFor='Fecha de nacimiento'>Fecha de nacimiento</label>
                <input type='date' placeholder='Fecha de nacimiento' className={styles.inputSignUp}></input>

                <label htmlFor='Nacionalidad'>Nacionalidad</label>
                <input type='text' placeholder='Nacionalidad' className={styles.inputSignUp}></input>

                <label htmlFor='Correo'>Correo</label>
                <input type='email' placeholder='Correo' className={styles.inputSignUp}></input>

                <label htmlFor='Contraseña'>Contraseña</label>
                <input type='password' placeholder='Contraseña' className={styles.inputSignUp}></input>

                <label htmlFor='Confirmar Contraseña'>Confirmar Contraseña</label>
                <input type='password' placeholder='Confirmar Contraseña' className={styles.inputSignUp}></input>
                <button className={styles.buttonSignUp}>Sign un</button>
                <button className={styles.buttonSignUp}>Google</button>
            </form>
            <div className={styles.secondContainerSignUp}>
                <button>Log in</button>
            </div>
        </div>
    )
}
export default SignUp
