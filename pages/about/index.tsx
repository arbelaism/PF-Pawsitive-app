import React from 'react'
import { MainLayout } from 'components'
import Image from 'next/image'
import styles from 'styles/About.module.css'
import placeholder from 'public/placeholder.jpg'
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai'

const team = [
    {
        id: 1,
        name: 'Maximiliano Arbelais',
        description:
            'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.',
        image: '',
        linkedin: 'https://www.linkedin.com/in/arbelaism/',
        github: 'https://www.github.com/arbelais'
    },
    {
        id: 2,
        name: 'Eric Isnado',
        description:
            'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.',
        image: '',
        linkedin:
            'https://www.linkedin.com/in/eric-denis-laura-isnado-8a1027245/',
        github: 'https://www.github.com/recover1988'
    },
    {
        id: 3,
        name: 'Nestor Quiñones',
        description:
            'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.',
        image: '',
        linkedin:
            'https://www.linkedin.com/in/n%C3%A9stor-qui%C3%B1ones-838539238/',
        github: 'https://www.github.com/nestordqa'
    },
    {
        id: 4,
        name: 'Cristian Posada',
        description:
            'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.',
        image: '',
        linkedin: '#',
        github: 'https://www.github.com/Cyacevedop'
    },
    {
        id: 5,
        name: 'David Guzman',
        description:
            'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.',
        image: '',
        linkedin: '#',
        github: 'https://www.github.com/davGuzMal'
    },
    {
        id: 6,
        name: 'Fernando Marquez',
        description:
            'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.',
        image: '',
        linkedin: 'https://www.linkedin.com/in/fernando-marquez-989a9824b/',
        github: 'https://www.github.com/ferdev2712'
    }
]

const About = () => {
    return (
        <MainLayout title="Pawsitive - About">
            <div className={styles.container}>
                <h1 className={styles.title}>Sobre nosotros</h1>
                <div className={styles.text}>
                <p>
                    Somos estudiantes de{' '}
                    <a
                        href="https://www.soyhenry.com"
                        target="_blank"
                        rel="noreferrer noopener"
                        className={styles.link}>
                        Henry&nbsp;
                    </a>
                    cursando la etapa final del bootcamp donde tenemos que
                    desarrollar una aplicación en grupo.
                </p>
                <p>
                    Lorem ipsum dolor sit amet, qui minim labore adipisicing
                    minim sint cillum sint consectetur cupidatat. Lorem ipsum
                    dolor sit amet, qui minim labore adipisicing minim sint
                    cillum sint consectetur cupidatat.
                </p>

                </div>
                <h1 className={styles.title}>Nuestro equipo</h1>
                <div className={styles.team}>
                    {team.map(user => {
                        return (
                            <div className={styles.user} key={user.id}>
                                <Image
                                    src={placeholder}
                                    alt="not found"
                                    width={256}
                                    height={256}
                                    className={styles.profile}
                                />
                                <div className={styles.description}>
                                    <h2>{user.name}</h2>
                                    <p>{user.description}</p>
                                    <div className={styles.social}>
                                        <a href={user.github}>
                                            <AiFillGithub />
                                        </a>
                                        <a href={user.linkedin}>
                                            <AiFillLinkedin />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </MainLayout>
    )
}

export default About
