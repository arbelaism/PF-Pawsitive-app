import { NextComponentType } from 'next'
import Link from 'next/link'
import { BsGithub } from 'react-icons/bs'
import { MdEmail } from 'react-icons/md'
import Image from 'next/image'
import IsoGreen from 'public/iso-green.svg'

const Footer: NextComponentType = () => {
    return (
        <>
            <footer className="w-full font-Rubik text-sm text-pwgreen-50 bg-pwgreen-500 flex flex-col mt-4">
                <div className="flex justify-between px-2 py-4 lg:px-4 lg:py-10 xl:mx-14">
                    <div className="flex ml-2 items-center gap-1 w-2/6 text-2xl lg:ml-10">
                        <Link href={'/'}>
                            <a className="flex items-center gap-1.5">
                                <Image
                                    src={IsoGreen}
                                    alt="not found"
                                    width={35}
                                    height={35}
                                />
                                <div className="font-Rubik hidden transition-all hover:drop-shadow-md md:block hover:text-pwgreen-800">
                                    Paw
                                    <span className="font-bold">sitive</span>
                                </div>
                            </a>
                        </Link>
                    </div>
                    <div className='w-4/6 flex flex-col text-end justify-between mr-2 md:flex-row md:text-start lg:mr-10'>
                        <div className="flex flex-col">
                            <h3 className="text-pwgreen-200 text-xs py-2">
                                Servicios
                            </h3>
                            <ul className="text-pwgreen-50 capitalize flex flex-col gap-1">
                                <li className="hover:text-pwgreen-800 transition-colors">
                                    <Link href={'/adoptions'}>
                                        <a>Adopciones</a>
                                    </Link>
                                </li>
                                <li className="hover:text-pwgreen-800 transition-colors">
                                    <Link href={'/Products'}>
                                        <a>Productos</a>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="flex flex-col">
                            <h3 className="text-pwgreen-200 text-xs py-2">
                                Links utiles
                            </h3>
                            <ul className="text-pwgreen-50 capitalize flex flex-col gap-1">
                                <li className="hover:text-pwgreen-800 transition-colors">
                                    <Link href={'/profile'}>
                                        <a>Tu perfil</a>
                                    </Link>
                                </li>
                                <li className="hover:text-pwgreen-800 transition-colors">
                                    <Link href={'/profile/transaction'}>
                                        <a>Tu historial de compras</a>
                                    </Link>
                                </li>
                                <li className="hover:text-pwgreen-800 transition-colors">
                                    <Link href={'/profile/adoption'}>
                                        <a>Tus adopciones</a>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="flex flex-col">
                            <h3 className="text-pwgreen-200 text-xs py-2">
                                Contacto
                            </h3>
                            <ul className="text-pwgreen-50 flex flex-col gap-1">
                                <li className="hover:text-pwgreen-800 transition-colors">
                                    <Link href={'/contact'}>
                                        <a className="flex items-center justify-end gap-1 md:justify-start">
                                            <MdEmail className="text-base" />
                                            pawsitiveteam0@gmail.com
                                        </a>
                                    </Link>
                                </li>
                                <li className="hover:text-pwgreen-800 transition-colors">
                                    <Link href={'/about'}>
                                        <a className="flex items-center justify-end gap-1 md:justify-start">
                                            <BsGithub className="text-base" />
                                            Github
                                        </a>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="text-pwgreen-50 bg-pwgreen-600 w-full py-4 text-center">
                    <p>
                        &#169; 2022.
                        <span className="font-Rubik px-1">
                            Paw
                            <span className="font-bold">sitive.</span>
                        </span>
                    </p>
                </div>
            </footer>
        </>
    )
}
export default Footer
