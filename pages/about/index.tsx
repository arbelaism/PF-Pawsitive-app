import React from 'react'
import { MainLayout } from 'components'
import Image from 'next/image'
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai'
import Maxi from 'public/profiles/maxi.jpeg'
import Eric from 'public/profiles/eric.jpg'
import David from 'public/profiles/david.jpg'
import Cristian from 'public/profiles/cristian.jpg'
import Nestor from 'public/profiles/nestor.jpeg'
import Fernando from 'public/profiles/fernando.jpg'

const team = [
    {
        id: 1,
        name: 'Maximiliano Arbelais',
        description:
            'Desarrollador full stack, con capacidades de liderazgo, buen manejo del ingles y, habilidad para dirigir y adapatarse a cualquier grupo de trabajo.',
        image: Maxi,
        linkedin: 'https://www.linkedin.com/in/arbelaism/',
        github: 'https://www.github.com/arbelais'
    },
    {
        id: 2,
        name: 'Eric Isnado',
        description:
            'Desarrollador full stack, con gran habilidad analítica y lógica capaz de encontrar soluciones a los problemas que se plantean y con alto interés en explorar los caminos de la programación.',
        image: Eric,
        linkedin:
            'https://www.linkedin.com/in/eric-denis-laura-isnado-8a1027245/',
        github: 'https://www.github.com/recover1988'
    },
    {
        id: 3,
        name: 'Nestor Quiñones',
        description:
            'Desarrollador full stack, siempre en búsqueda de nuevos conocimientos, con buenas habilidades para tratar con personas y trabajar en equipo.',
        image: Nestor,
        linkedin:
            'https://www.linkedin.com/in/n%C3%A9stor-qui%C3%B1ones-838539238/',
        github: 'https://www.github.com/nestordqa'
    },
    {
        id: 4,
        name: 'Cristian Posada',
        description:
            'Desarrollador full stack, con experiencia en diseño de videojuegos en unity. Y conocimientos en campañas de marketing apoyadas en videojuegos.',
        image: Cristian,
        linkedin: '#',
        github: 'https://www.github.com/Cyacevedop'
    },
    {
        id: 5,
        name: 'David Guzman',
        description:
            'Desarrollador full stack, con alta capacidad de aprendizaje y habilidades para desarrollar de forma ágil y solucionar problemas con prontitud.',
        image: David,
        linkedin: '#',
        github: 'https://www.github.com/davGuzMal'
    },
    {
        id: 6,
        name: 'Fernando Marquez',
        description:
            'Desarrollador full stack, con preferencia por el front, siempre en búsqueda de mejorar y en aprendizaje constante para mantenerse a la vanguardia de las teconologías.',
        image: Fernando,
        linkedin: 'https://www.linkedin.com/in/fernando-marquez-989a9824b/',
        github: 'https://www.github.com/ferdev2712'
    }
]

const About = () => {
    return (
        <MainLayout title="Pawsitive - About">
            <div className="w-full flex justify-center p-6 text-pwgreen-900 bg-pwgreen-50 lg:p-14">
                <div className="w-5/6">
                    <h1 className="title mb-4 text-2xl lg:text-4xl xl:text-5xl">
                        Sobre Nosotros
                    </h1>
                    <div className="text-xl tracking-wide text-justify">
                        <p>
                            Somos estudiantes de
                            <a
                                href="https://www.soyhenry.com"
                                target="_blank"
                                rel="noreferrer noopener"
                                className="text-pwgreen-600 hover:text-pwgreen-800 transition-colors">
                                &nbsp;Henry&nbsp;
                            </a>
                            cursando la etapa final del bootcamp donde tenemos
                            que desarrollar una aplicación en grupo cumpliendo
                            diferentes objetivos propuestos por el bootcamp para
                            mejorar nuestras capacidades como desarrolladores.
                        </p>
                        <p>
                            Esta aplicación web tiene como objetivo conectar
                            personas con posibles mascotas en adopción, además
                            de brindar la posibilidad de comprar utensilios para
                            mejorar la calidad de vida de las mascotas.
                        </p>
                    </div>
                    <h1 className="title my-6 text-2xl lg:text-4xl xl:text-5xl">
                        Nuestro Equipo
                    </h1>
                    <div className="grid auto-cols-fr lg:grid-cols-2 gap-5 text-pwgreen-50">
                        {team.map(user => {
                            return (
                                <div
                                    className="flex flex-col lg:flex-row justify-content-center items-center gap-5 py-4 rounded-xl bg-pwgreen-600 shadow-md hover:shadow-xl transition-all lg:p-8"
                                    key={user.id}>
                                    <div className="w-2/5">
                                        <Image
                                            src={user.image}
                                            alt="not found"
                                            width={256}
                                            height={256}
                                            className="rounded-full"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-3 justify-between w-3/5">
                                        <h2 className="font-Rubik text-2xl font-semibold">
                                            {user.name}
                                        </h2>
                                        <p>{user.description}</p>
                                        <div className="flex justify-end items-center gap-2 my-2">
                                            <a
                                                className="text-3xl"
                                                href={user.github}>
                                                <AiFillGithub className="transition-all hover:text-pwgreen-800" />
                                            </a>
                                            <a
                                                className="text-3xl"
                                                href={user.linkedin}>
                                                <AiFillLinkedin className="transition-all hover:text-pwgreen-800" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default About
