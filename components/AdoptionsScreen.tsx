import { NextComponentType } from 'next'
import style from '../styles/AdoptionsScreen.module.css'
import Link from 'next/link'

const AdoptionsScreen: NextComponentType = () => {
    return (
        <Link href='#'>
            <div className={style.containerAdoptionsScreen}>
                <h1 className={style.titleAdoptionsScreen}>Adopciones</h1>
                <p className={style.descriptionAdoptionsScreen}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                <div className={style.buttonsContainerAdoptionsScreen}>
                    <Link href='#'>
                        <a className={style.buttonsAdoptionsScreen}>Adoptar</a>
                    </Link>
                    /
                    <Link href='#'>
                        <a className={style.buttonsAdoptionsScreen}>Dar en adopcion</a>
                    </Link>
                </div>
            </div>
        </Link>
    )
}
export default AdoptionsScreen
