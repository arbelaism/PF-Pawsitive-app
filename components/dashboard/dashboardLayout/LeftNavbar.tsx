import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import IsoGreen from 'public/iso-green.svg'
import { AiFillAppstore } from 'react-icons/ai'
import { FaUser, FaPaw, FaBalanceScale, FaCog } from 'react-icons/fa'
import { useRouter } from 'next/router'

type Props = {
    active: string
}

const LeftNavbar = ({ active }: Props) => {
    const router = useRouter()
    return (
        <div className="w-full p-10">
            <div className="flex items-center justify-start gap-2">
                <Image src={IsoGreen} alt="not found" width={40} height={40} />
                <h1 className="font-Rubik text-3xl text-pwgreen-900">
                    Paw<span className="font-bold">sitive</span>
                </h1>
            </div>
            <div className="my-6">
                <ul>
                    <h3 className="dashboardSideTitle">General</h3>
                    <li
                        className={
                            router.pathname === '/dashboard'
                                ? 'dashboardButton active'
                                : 'dashboardButton'
                        }>
                        <AiFillAppstore />
                        <Link href={'/dashboard'}>Resumen</Link>
                    </li>
                    <li
                        className={
                            router.pathname === '/dashboard/activity'
                                ? 'dashboardButton active'
                                : 'dashboardButton'
                        }>
                        <FaPaw />
                        <Link href={'#'}>Actividad</Link>
                    </li>
                    <li
                        className={
                            router.pathname === '/dashboard/users'
                                ? 'dashboardButton active'
                                : 'dashboardButton'
                        }>
                        <FaUser />
                        <Link href={'/dashboard/users'}>Usuarios</Link>
                    </li>
                    <h3 className="dashboardSideTitle">Adopciones</h3>
                    <li
                        className={
                            router.pathname === '/dashboard/adoptions'
                                ? 'dashboardButton active'
                                : 'dashboardButton'
                        }>
                        <FaPaw />
                        <Link href={'#'}>Adopciones</Link>
                    </li>
                    <li
                        className={
                            router.pathname === '/dashboard/applies'
                                ? 'dashboardButton active'
                                : 'dashboardButton'
                        }>
                        <FaPaw />
                        <Link href={'#'}>Postulaciones</Link>
                    </li>
                    <h3 className="dashboardSideTitle">Productos</h3>
                    <li
                        className={
                            router.pathname === '/dashboard/products'
                                ? 'dashboardButton active'
                                : 'dashboardButton'
                        }>
                        <FaPaw />
                        <Link href={'#'}>Productos</Link>
                    </li>
                    <h3 className="dashboardSideTitle">Ventas</h3>
                    <li
                        className={
                            router.pathname === '/dashboard/balance'
                                ? 'dashboardButton active'
                                : 'dashboardButton'
                        }>
                        <FaBalanceScale />
                        <Link href={'#'}>Balance</Link>
                    </li>
                    <li
                        className={
                            router.pathname === '/dashboard/transactions'
                                ? 'dashboardButton active'
                                : 'dashboardButton'
                        }>
                        <FaUser />
                        <Link href={'#'}>Transacciones</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default LeftNavbar
