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
            <div className='w-full text-center'>
                <h1 className='text-4xl font-bold font-Rubik my-8 underline-offset-1'>Sobre Nosotros</h1>
                <div className='text-xl font-sans font-semibold tracking-wide mx-8'>
                <p >
                    Somos estudiantes de{' '}
                    <a
                        href="https://www.soyhenry.com"
                        target="_blank"
                        rel="noreferrer noopener"
                        className='underline-offset-1'>
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
                <h1 className='text-4xl font-bold font-Rubik my-8 underline-offset-1'>Nuestro Equipo</h1>
                <div className='grid auto-cols-fr lg:grid-cols-2 gap-5 m-6 text-pwgreen-50'>
                    {team.map(user => {
                        return (
                            <div className='flex flex-col lg:flex-row justify-content-center items-center gap-3 p-8 rounded-xl bg-pwgreen-500 shadow-xl' key={user.id}>
                                <Image
                                    src={placeholder}
                                    alt="not found"
                                    width={256}
                                    height={256}
                                    className='rounded-full'
                                />
                                <div className='flex flex-col justify-between'>
                                    <h2 className='text-2xl font-semibold'>{user.name}</h2>
                                    <p>{user.description}</p>
                                    <div className='flex justify-end items-center'>
                                        <a className='text-3xl' href={user.github}>
                                            <AiFillGithub />
                                        </a>
                                        <a className='text-3xl' href={user.linkedin}>
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
