import { NextComponentType } from 'next'
import styles from 'styles/SignUp.module.css'

const SignUp: NextComponentType = () => {
    return (
        <div className={styles.containerSignUp}>
            <h2 className={styles.titleSignUp}>Sign up</h2>
            <p>Please sign up to proceed.</p>
            <form className={styles.formSignUp}>
                <img alt='logo'></img>
                <label htmlFor='names'>Nombres</label>
                <input type='text' name='names' placeholder='Nombres' className={styles.inputSignUp}></input>

                <label htmlFor='lastNames'>Apellidos</label>
                <input type='text' name='lastNames' placeholder='Apellidos' className={styles.inputSignUp}></input>

                <label htmlFor='birthday'>Fecha de nacimiento</label>
                <input type='date' name='birthday' placeholder='Fecha de nacimiento' className={styles.inputSignUp}></input>

                <label htmlFor='nationality'>Nacionalidad</label>
                <input type='text' name='nationality' placeholder='Nacionalidad' className={styles.inputSignUp}></input>

                <label htmlFor='email'>Correo</label>
                <input type='email' name='email' placeholder='Correo' className={styles.inputSignUp}></input>

                <label htmlFor='password'>Contraseña</label>
                <input type='password' name='password' placeholder='Contraseña' className={styles.inputSignUp}></input>

                <label htmlFor='confirmPassword'>Confirmar Contraseña</label>
                <input type='password' name='confirmPassword' placeholder='Confirmar Contraseña' className={styles.inputSignUp}></input>
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
