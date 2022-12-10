import { useUser } from '@auth0/nextjs-auth0/client'
import React, { useState } from 'react'
import Image from 'next/image'

type Props = {
    title: string
}

const Header = ({ title }: Props) => {
    const [dropdown, setDropdown] = useState(false)
    const { user } = useUser()

    return (
        <div className="p-8 flex items-center justify-between">
            <h1 className="font-Rubik text-3xl text-pwgreen-900 font-semibold p-2">
                {title}
            </h1>
            <h3 className="font-Rubik text-xl">Bienvenido, {user?.name}</h3>

            <div className="relative">
                <button
                    onClick={() => {
                        setDropdown(!dropdown)
                    }}
                    className="text-pwgreen-100 bg-pwgreen-800 hover:bg-green-50 hover:text-pwgreen-800 font-medium rounded-lg text-sm px-4 py-2.5 flex gap-2 items-center"
                    type="button">
                    <Image
                        src={user?.picture ?? ''}
                        alt="not found"
                        width={32}
                        height={32}
                        className="rounded-full"
                    />
                    {user?.name}
                </button>
                {dropdown ? (
                    <div className="absolute top-14 left-0 z-10 w-full bg-pwgreen-700 rounded divide-y divide-slate-100 shadow-lg">
                        <div className="py-3 px-4 text-sm text-gray-900 dark:text-white">
                            <div>{user?.name}</div>
                            <div className="font-medium truncate">
                                {user?.email}
                            </div>
                        </div>
                        <ul
                            className="py-1 text-sm text-gray-700 dark:text-gray-200"
                            aria-labelledby="dropdownInformationButton">
                            <li>
                                <a
                                    href="#"
                                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                    Perfil
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                    Configuración
                                </a>
                            </li>
                        </ul>
                        <div className="py-1">
                            <a
                                href="#"
                                className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                                out
                            </a>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    )
}

export default Header
