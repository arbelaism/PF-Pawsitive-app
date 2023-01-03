import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useUser } from '@auth0/nextjs-auth0/client'
import { useQuery } from 'react-query'
import { getUserById } from 'utils/dbFetching'

type Props = {
    userName: string
    userEmail: string
    userPicture: string
}

const UserButton = ({ userName, userEmail, userPicture }: Props) => {
    const [dropdown, setDropdown] = useState(false)
    const { user } = useUser()
    const [isAdmin, setIsAdmin] = useState(false)

    let id: string = ''
    if (user && user.sub) {
        id = user.sub
    }
    const { data: dbUser, isLoading } = useQuery(['user', id], () =>
        getUserById(id)
    )

    useEffect(() => {
        if (!isLoading && dbUser) {
            if (dbUser.role === 'ADMIN') {
                setIsAdmin(true)
                return
            }
        }
    }, [dbUser])

    const showMenu = () => {
        const menu = document.getElementById('dropdown')

        if (!menu) return
        if (dropdown) {
            menu.classList.add('hidden')
            setDropdown(false)
            return
        }

        menu.classList.remove('hidden')
        setDropdown(true)
    }

    return (
        <div className="w-max relative z-40">
            <button
                onClick={showMenu}
                className="w-max text-pwgreen-50 bg-pwgreen-600 hover:bg-pwgreen-800 font-medium rounded-lg text-sm px-4 py-2.5 flex gap-2 items-center z-40 transition-all"
                type="button">
                <Image
                    src={userPicture}
                    alt="not found"
                    width={24}
                    height={24}
                    className="rounded-full"
                    objectFit='cover'
                />
                <span className="hidden xl:block">{userName}</span>
            </button>
            <div
                id="dropdown"
                className="absolute top-12 border border-pwgreen-500 hidden right-0 z-40 w-max bg-pwgreen-50 rounded divide-y divide-slate-200 shadow-lg transition-all">
                <div className="py-3 px-4 text-sm text-pwgreen-800">
                    <div className="font-medium truncate">{userEmail}</div>
                </div>
                <ul
                    className="text-sm text-pwgreen-800"
                    aria-labelledby="dropdownInformationButton">
                    <li className={isAdmin ? '' : 'hidden'}>
                        <Link href={'/dashboard'}>
                            <a className="block py-3 px-4 hover:bg-pwgreen-600 hover:text-pwgreen-50 transition-colors">
                                Dashboard
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href={'/profile'}>
                            <a className="block py-3 px-4 hover:bg-pwgreen-600 hover:text-pwgreen-50 transition-colors">
                                Perfil
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href={'/bookmarks'}>
                            <a className="block py-3 px-4 md:hidden hover:bg-pwgreen-600 hover:text-pwgreen-50 transition-colors">
                                Favoritos
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href={'/profile/transaction'}>
                            <a className="block py-3 px-4 hover:bg-pwgreen-600 hover:text-pwgreen-50 transition-colors">
                                Historial de compras
                            </a>
                        </Link>
                    </li>
                </ul>
                <div className="text-sm text-pwgreen-800">
                    <Link href={'/api/auth/logout'}>
                        <a className="block py-3 px-4 hover:bg-pwgreen-600 hover:text-pwgreen-50 transition-colors">
                            Cerrar sesión
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default UserButton
