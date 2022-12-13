import { NextComponentType } from 'next'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Product } from '../../app/types'
import { useUser } from '@auth0/nextjs-auth0/client'
import { FaShoppingCart } from 'react-icons/fa'
import { HiMenu } from 'react-icons/hi'
import UserButton from './UserButton'
import { checkEmail } from 'utils/checkEmail'
import Image from 'next/image'
import IsoGreen from 'public/iso-green.svg'
import { redirectionAlert } from 'utils/alerts'
import { useRouter } from 'next/router'

const Navbar: NextComponentType = () => {
    const [cartProducts, setCartProducts] = useState(0)
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
            if (totalProducts.length) {
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
    const alertShoppingCart = () => {
        if (!user) {
            redirectionAlert({
                icon: 'info',
                title: '<strong>Inicio de sesion requerido</strong>',
                html:
                    'Para acceder al carrito de compras y poder disfrutar de todas nuestras funcionalidades' +
                    ' te invitamos a iniciar sesion o crear una cuenta.',
                confirmButtonText: 'Iniciar sesion',
                confirmButtonAriaLabel: 'Thumbs up, great!',
                link: '/api/auth/login'
            })
        } else {
            router.push('/shoppingCart')
        }
    }
    const onClick = () => {
        const menu = document.querySelector('#menu')
        const menuCart = document.querySelector('#menu-cart')
        menu?.classList.toggle('hidden')
        menuCart?.classList.toggle('hidden')
    }
    return (
        <nav className="flex items-center justify-between flex-wrap gap-5 bg-pwgreen-500 shadow-md text-pwgreen-50 py-5 px-6 lg:py-3">
            <div className="flex items-center gap-1 flex-shrink-0 text-2xl">
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
            <div className="block lg:hidden">
                <button
                    onClick={onClick}
                    className="flex items-center px-3 py-2 rounded border border-pwgreen-300 text-pwgreen-100 text-xl hover:text-pwgreen-800 hover:border-pwgreen-800 transition-all">
                    <HiMenu />
                </button>
            </div>
            <div
                id="menu"
                className="w-full block justify-between font-medium uppercase font-Rubik lg:flex lg:items-center lg:w-auto">
                <div>
                    <Link href={'/'}>
                        <a className="navbarLink">Home</a>
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
            <div className="flex justify-between items-center w-full lg:w-max" id="menu-cart">
                <button onClick={alertShoppingCart}>
                    <a
                        className="flex items-center hover:text-pwgreen-800
                    hover:font-bold transition-all gap-2 mr-4">
                        <FaShoppingCart className="text-xl" />
                        <div>{cartProducts}</div>
                    </a>
                </button>
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
