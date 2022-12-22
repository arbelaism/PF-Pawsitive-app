import { NextComponentType } from 'next'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Product } from '../../app/types'
import { useUser } from '@auth0/nextjs-auth0/client'
import { FaHeart, FaShoppingCart } from 'react-icons/fa'
import { HiMenu } from 'react-icons/hi'
import UserButton from './UserButton'
import { checkEmail } from 'utils/checkEmail'
import Image from 'next/image'
import IsoGreen from 'public/iso-green.svg'
import { redirectionAlert } from 'utils/alerts'
import { useRouter } from 'next/router'

const Navbar: NextComponentType = () => {
    const [cartProducts, setCartProducts] = useState(0)
    const [toggleMenu, setToggleMenu] = useState(false)
    const { user, error, isLoading } = useUser()
    const router = useRouter()

    let email: string = ''
    let name: string = ''
    let nickname: string = ''

    if (user && user.sub && user.nickname && user.name) {
        email = checkEmail(user.sub, user.nickname)
        name = user.name
        nickname = user.nickname

        if (email && email === 'auth0') {
            email = user.name
            name = user.nickname
            nickname = user.name
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
    const alertSessionRequired = () => {
        if (!user) {
            redirectionAlert({
                icon: 'info',
                title: '<strong>Inicio de sesion requerido</strong>',
                html: 'Para acceder a tus favoritos necesitas iniciar sesión',
                confirmButtonText: 'Iniciar sesion',
                confirmButtonAriaLabel: 'Thumbs up, great!',
                link: '/api/auth/login'
            })
        } else {
            router.push('/bookmarks')
        }
    }
    const openNav = () => {
        const menu = document.getElementById('menu')

        if (!menu) return
        if (menu.style.top === '-15rem') {
            menu.style.top = '4rem'
            setToggleMenu(true)
            return
        }

        menu.style.top = '-15rem'
        setToggleMenu(false)
    }
    return (
        <nav className="sticky top-0 w-full z-30 flex gap-3 bg-pwgreen-500 shadow-md text-pwgreen-50 py-5 px-6 md:justify-between lg:py-5">
            <div className="relative flex justify-start flex-col gap-3 w-3/4">
                <div className="block lg:hidden">
                    <button
                        onClick={openNav}
                        className="flex items-center px-3 py-2 rounded border border-pwgreen-300 text-pwgreen-100 text-xl hover:text-pwgreen-800 hover:border-pwgreen-800 transition-all">
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
                    className="absolute bg-pwgreen-500 w-screen pb-8 -top-60 -left-6 text-center lg:bg-transparent h-max lg:flex lg:justify-center lg:pb-4 lg:left-2/4 lg:-translate-x-1/4 lg:w-max xl:w-3/4 lg:top-2.5 lg:justify-center font-medium uppercase font-Rubik transition-all">
                    <Link href={'/'}>
                        <a className="navbarLink">Inicio</a>
                    </Link>
                    <Link href={'/adoptions'}>
                        <a className="navbarLink">Adopciones</a>
                    </Link>
                    <Link href={'/products'}>
                        <a className="navbarLink">Productos</a>
                    </Link>
                    <Link href={'/contact'}>
                        <a className="navbarLink">Contacto</a>
                    </Link>
                    <Link href={'/about'}>
                        <a className="navbarLink">Sobre nosotros</a>
                    </Link>
                </div>
            </div>
            <div className="flex justify-end w-1/4 h-max lg:w-max">
                <button onClick={alertSessionRequired}>
                    <Link href={'/bookmarks'}>
                        <a
                            className="hidden md:flex items-center hover:text-pwgreen-800
                    hover:font-bold transition-all gap-2 mr-4">
                            <FaHeart className="text-xl" />
                        </a>
                    </Link>
                </button>
                <Link href={'/shoppingCart'}>
                    <a
                        className="flex items-center hover:text-pwgreen-800
                    hover:font-bold transition-all gap-2 mr-4">
                        <FaShoppingCart className="text-xl" />
                        {cartProducts ? (
                            <span className="flex absolute -mt-5 ml-4">
                                <span className="animate-ping absolute inline-flex h-2.5 w-2.5 rounded-full bg-pwpurple-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-pwpurple-500"></span>
                            </span>
                        ) : null}
                    </a>
                </Link>
                {!user ? (
                    <div>
                        <Link href="/api/auth/login">
                            <a className="navbarLink">Iniciar sesión</a>
                        </Link>
                    </div>
                ) : (
                    <UserButton
                        userName={name ?? ''}
                        userEmail={email ?? ''}
                        userPicture={user?.picture ?? ''}
                    />
                )}
            </div>
        </nav>
    )
}
export default Navbar
