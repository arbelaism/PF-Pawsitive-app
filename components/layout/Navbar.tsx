import { NextComponentType } from 'next'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Product } from 'app/types'
import { useUser } from '@auth0/nextjs-auth0/client'
import { FaHeart, FaShoppingCart } from 'react-icons/fa'
import { HiMenu } from 'react-icons/hi'
import UserButton from './UserButton'
import { getEmail } from 'utils/checkEmail'
import Image from 'next/image'
import IsoGreen from 'public/iso-green.svg'
import { redirectionAlert } from 'utils/alerts'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { getUserById } from 'utils/dbFetching'

const Navbar: NextComponentType = () => {
    const [cartProducts, setCartProducts] = useState(0)
    const [show, setShow] = useState(true)
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [lastScrollY, setLastScrollY] = useState(0)
    const { user, error, isLoading } = useUser()
    const router = useRouter()

    let userId: string = ''
    if (user && user.sub) {
        userId = user.sub
    }

    const { data: dbUser, isLoading: uIsLoading } = useQuery(
        ['user', userId],
        () => getUserById(userId)
    )

    useEffect(() => {
        if (!uIsLoading && dbUser) {
            console.log(dbUser)
            setName(dbUser.firstName || user?.name)
            getEmail(userId).then(res => {
                setEmail(res)
            })
        }
    }, [uIsLoading])

    const controlNavbar = () => {
        if (typeof window !== 'undefined') {
            if (window.scrollY > lastScrollY) {
                setShow(false)
                document.querySelector('nav')!.style.top = '-6rem'
            } else {
                setShow(true)
                document.querySelector('nav')!.style.top = '0'
            }

            setLastScrollY(window.scrollY)
        }
    }

    function updateProducts() {
        const totalProducts = JSON.parse(
            window.localStorage.getItem('cartProducts')!
        )
        setCartProducts(() => {
            let total: number = 0
            if (totalProducts?.length) {
                totalProducts.map(
                    (product: Product) => (total += product.amount!)
                )
            }
            return total
        })
    }
    useEffect(() => {
        var timerID = setInterval(() => updateProducts(), 50)
        return () => clearInterval(timerID)
    })
    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', controlNavbar)

            return () => {
                window.removeEventListener('scroll', controlNavbar)
            }
        }
    }, [lastScrollY])

    const alertSessionRequired = (path: string) => {
        if (!user) {
            redirectionAlert({
                icon: 'info',
                title: '<strong>Inicio de sesion requerido</strong>',
                html: 'Para acceder a esta sección necesitas iniciar sesión',
                confirmButtonText: 'Iniciar sesion',
                confirmButtonAriaLabel: 'Thumbs up, great!',
                link: '/api/auth/login'
            })
        } else if (user !== undefined) {
            router.push(path)
        }
    }
    const openNav = () => {
        const menu = document.getElementById('menu')

        if (!menu) return
        if (menu.style.top === '' || menu.style.top === '-16rem') {
            menu.style.top = '3.5rem'
            return
        }

        menu.style.top = '-16rem'
    }

    return (
        <nav
            className={`sticky top-0 w-full z-30 flex gap-3 bg-pwgreen-500 shadow-md text-pwgreen-50 py-5 px-6 md:justify-between lg:py-5 items-center transition-all ${
                show && 'top-0'
            }`}>
            <div className="relative flex justify-start flex-col gap-3 w-3/4">
                <div className="block lg:hidden">
                    <button
                        onClick={openNav}
                        className="flex items-center px-3 py-2 rounded text-pwgreen-100 text-2xl hover:text-pwgreen-800 transition-all">
                        <HiMenu />
                    </button>
                </div>
                <div className="hidden lg:flex lg:items-center gap-1 h-full flex-shrink-0 text-2xl">
                    <Link href={'/'}>
                        <a className="flex items-center gap-1.5">
                            <Image
                                src={IsoGreen}
                                alt="not found"
                                width={35}
                                height={35}
                            />
                            <div className="hidden font-Rubik transition-all md:block hover:drop-shadow-md hover:text-pwgreen-800">
                                Paw
                                <span className="font-bold">sitive</span>
                            </div>
                        </a>
                    </Link>
                </div>
                <div
                    id="menu"
                    className="absolute bg-pwgreen-500 w-screen pb-8 -top-64 -left-6 text-center lg:bg-transparent h-max lg:flex lg:pb-4 lg:left-2/4 lg:-translate-x-1/4 lg:w-max xl:w-3/5 lg:top-1.5 lg:justify-center font-medium uppercase font-Rubik transition-all">
                    <Link href={'/'}>
                        <a
                            className={
                                router.pathname === '/'
                                    ? 'navbarLink navbarLinkActive'
                                    : 'navbarLink'
                            }>
                            Inicio
                        </a>
                    </Link>
                    <Link href={'/adoptions'}>
                        <a
                            className={
                                router.pathname === '/adoptions'
                                    ? 'navbarLink navbarLinkActive'
                                    : 'navbarLink'
                            }>
                            Adopciones
                        </a>
                    </Link>
                    <Link href={'/products'}>
                        <a
                            className={
                                router.pathname === '/products'
                                    ? 'navbarLink navbarLinkActive'
                                    : 'navbarLink'
                            }>
                            Productos
                        </a>
                    </Link>
                    <Link href={'/contact'}>
                        <a
                            className={
                                router.pathname === '/contact'
                                    ? 'navbarLink navbarLinkActive'
                                    : 'navbarLink'
                            }>
                            Contacto
                        </a>
                    </Link>
                    <Link href={'/about'}>
                        <a
                            className={
                                router.pathname === '/about'
                                    ? 'navbarLink navbarLinkActive'
                                    : 'navbarLink'
                            }>
                            Sobre nosotros
                        </a>
                    </Link>
                </div>
            </div>
            <div className="flex justify-end items-center w-1/4 h-max gap-x-3.5 lg:w-max">
                <button onClick={e => alertSessionRequired('/bookmarks')}>
                    <a
                        className="hidden md:flex items-center hover:text-pwgreen-800
                    hover:font-bold transition-all gap-2">
                        <FaHeart className="text-xl" />
                    </a>
                </button>
                <button onClick={e => alertSessionRequired('/shoppingCart')}>
                    <a
                        className="flex items-center hover:text-pwgreen-800
                    hover:font-bold transition-all gap-2">
                        <FaShoppingCart className="text-xl" />
                        {cartProducts ? (
                            <span className="flex absolute -mt-5 ml-4">
                                <span className="animate-ping absolute inline-flex h-2.5 w-2.5 rounded-full bg-pwpurple-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-pwpurple-500"></span>
                            </span>
                        ) : null}
                    </a>
                </button>
                <div className="ml-2">
                    {!user ? (
                        <div>
                            <Link href="/api/auth/login">
                                <a className="navbarLink m-0 w-max">
                                    Iniciar sesión
                                </a>
                            </Link>
                        </div>
                    ) : (
                        <UserButton
                            userName={name ?? ''}
                            userEmail={email ?? ''}
                            userPicture={dbUser?.photo ?? ''}
                        />
                    )}
                </div>
            </div>
        </nav>
    )
}
export default Navbar
