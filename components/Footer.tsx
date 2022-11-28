import { NextComponentType } from 'next'
import Link from 'next/link'
import styles from 'styles/Footer.module.css'
import { AiFillGithub } from 'react-icons/ai'

const Footer: NextComponentType = () => {
    return (
        <>
            <footer className={styles.footer}>
                <div className={styles.footerContainer}>
                    <div className={styles.logoContainer}>
                        <Link href={'/home'}>
                            <a>
                                <span className={styles.paw}>Paw</span>
                                <span className={styles.sitive}>sitive</span>
                            </a>
                        </Link>
                    </div>
                    <div className={styles.footerCopyright}>
                        <p>
                            @ Copyright 2022 Pawsitive App. Todos los derechos
                            reservados
                        </p>
                    </div>
                    <div className={styles.menuContainer}>
                        <ul className={styles.menu}>
                            <li>
                                <Link href={'/contact'}>
                                    <a>Contacto</a>
                                </Link>
                            </li>
                            <li>
                                <Link href={'/about'}>
                                    <a>About</a>
                                </Link>
                            </li>
                            <li className={styles.icons}>
                                <Link
                                    href="https://github.com/arbelais/PF-Pawsitive-app.git"
                                    target="_blank">
                                    <a>
                                        <AiFillGithub />
                                    </a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </footer>
        </>
    )
}
export default Footer
