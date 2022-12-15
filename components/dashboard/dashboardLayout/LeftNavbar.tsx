import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import IsoGreen from 'public/iso-green.svg'
import { AiFillAppstore } from 'react-icons/ai'
import { FaUser, FaPaw } from 'react-icons/fa'
import { useRouter } from 'next/router'
import { useUser } from '@auth0/nextjs-auth0/client'
import { useGetUserById } from 'utils/dbFetching'

const LeftNavbar: any = () => {
    const router = useRouter()
    const { user } = useUser()
    const [isAdmin, setIsAdmin] = useState(false)

    let id: string = ''
    if (user && user.sub) {
        id = user.sub
    }
    const dbUser = useGetUserById(id)

    if (dbUser.data) {
        if (dbUser.data.role === 'ADMIN') {
            setIsAdmin(true)
            return
        }
    }

    return (
        <div className="h-full bg-white p-5 min-w-[15rem] lg:p-8">
            <div className="relative hidden lg:flex lg:items-center md:gap-2 lg:justify-start">
                <Image src={IsoGreen} alt="not found" width={40} height={40} />
                <h1 className="font-Rubik text-pwgreen-900 hidden lg:block lg:text-2xl">
                    Paw<span className="font-bold">sitive</span>
                </h1>
            </div>
            <div className="my-6">
                {isAdmin ? (
                    <ul>
                        <h3 className="dashboardSideTitle">General</h3>
                        <li
                            className={
                                router.pathname === '/dashboard'
                                    ? 'dashboardButton active'
                                    : 'dashboardButton'
                            }>
                            <AiFillAppstore />
                            <Link href={'/dashboard'}>
                                <a className="dashboardLinks">Resumen</a>
                            </Link>
                        </li>
                        <li
                            className={
                                router.pathname === '/dashboard/users'
                                    ? 'dashboardButton active'
                                    : 'dashboardButton'
                            }>
                            <FaUser />
                            <Link href={'/dashboard/users'}>
                                <a className="dashboardLinks">Usuarios</a>
                            </Link>
                        </li>
                        <h3 className="dashboardSideTitle">Adopciones</h3>
                        <li
                            className={
                                router.pathname === '/dashboard/adoptions'
                                    ? 'dashboardButton active'
                                    : 'dashboardButton'
                            }>
                            <FaPaw />
                            <Link href={'/dashboard/adoptions'}>
                                <a className="dashboardLinks">Adopciones</a>
                            </Link>
                        </li>
                        <li
                            className={
                                router.pathname === '/dashboard/applies'
                                    ? 'dashboardButton active'
                                    : 'dashboardButton'
                            }>
                            <FaPaw />
                            <Link href={'/dashboard/applies'}>
                                <a className="dashboardLinks">Aplicantes</a>
                            </Link>
                        </li>
                        <h3 className="dashboardSideTitle">Productos</h3>
                        <li
                            className={
                                router.pathname === '/dashboard/products'
                                    ? 'dashboardButton active'
                                    : 'dashboardButton'
                            }>
                            <FaPaw />
                            <Link href={'/dashboard/products'}>
                                <a className="dashboardLinks">Productos</a>
                            </Link>
                        </li>
                        <h3 className="dashboardSideTitle">Ventas</h3>
                        <li
                            className={
                                router.pathname === '/dashboard/transactions'
                                    ? 'dashboardButton active'
                                    : 'dashboardButton'
                            }>
                            <FaUser />
                            <Link href={'/dashboard/transactions'}>
                                <a className="dashboardLinks">Transacciones</a>
                            </Link>
                        </li>
                    </ul>
                ) : (
                    <ul>
                        <h3 className="dashboardSideTitle">Adopciones</h3>
                        <li
                            className={
                                router.pathname === '/dashboard/adoptions'
                                    ? 'dashboardButton active'
                                    : 'dashboardButton'
                            }>
                            <FaPaw />
                            <Link href={'/profile/adoption'}>
                                <a className="dashboardLinks">Mis adopciones</a>
                            </Link>
                        </li>
                        <li
                            className={
                                router.pathname === '/profile/apply'
                                    ? 'dashboardButton active'
                                    : 'dashboardButton'
                            }>
                            <FaPaw />
                            <Link href={'/profile/apply'}>
                                <a className="dashboardLinks">Aplicantes</a>
                            </Link>
                        </li>
                        <h3 className="dashboardSideTitle">Productos</h3>
                        <li
                            className={
                                router.pathname === '/profile/transaction'
                                    ? 'dashboardButton active'
                                    : 'dashboardButton'
                            }>
                            <FaPaw />
                            <Link href={'/profile/transaction'}>
                                <a className="dashboardLinks">
                                    Historial de compras
                                </a>
                            </Link>
                        </li>
                    </ul>
                )}
            </div>
        </div>
    )
}

export default LeftNavbar
