import { NextComponentType } from 'next'
import style from 'styles/AdoptionsScreen.module.css'
import Link from 'next/link'
import { BsFillArrowRightCircleFill } from 'react-icons/bs'

const AdoptionsScreen: NextComponentType = () => {
    return (
        <div className={style.containerAdoptionsScreen}>
            <div className={style.content}>
                <h1 className={style.titleAdoptionsScreen}>Adopciones</h1>
                <p className={style.descriptionAdoptionsScreen}>
                    Lorem ipsum dolor sit amet, officia excepteur ex fugiat
                    reprehenderit enim labore culpa sint ad nisi Lorem pariatur
                    mollit ex esse exercitation amet. Nisi anim cupidatat
                    excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem
                    est aliquip amet voluptate voluptate dolor minim nulla est
                    proident. Nostrud officia pariatur ut officia. Sit irure
                    elit esse ea nulla sunt ex occaecat reprehenderit commodo
                    officia dolor Lorem duis laboris cupidatat officia
                    voluptate.
                </p>
            </div>
            <div className={style.buttonsContainerAdoptionsScreen}>
                <Link href="/adoptions">
                    <a className={style.buttonsAdoptionsScreen}>
                        Ir a Adopciones
                        <BsFillArrowRightCircleFill />
                    </a>
                </Link>
                {/* <Link href="/adopt"> */}
                {/*     <a className={style.buttonsAdoptionsScreen}> */}
                {/*         Dar en adopcion */}
                {/*     </a> */}
                {/* </Link> */}
            </div>
        </div>
    )
}
export default AdoptionsScreen
