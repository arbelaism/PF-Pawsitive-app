import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
    userName: string
    userEmail: string
    userPicture: string
}

const UserButton = ({ userName, userEmail, userPicture }: Props) => {
    const [dropdown, setDropdown] = useState(false)
    return (
        <div className="w-56 relative">
            <button
                onClick={() => {
                    setDropdown(!dropdown)
                }}
                className="w-full text-pwgreen-100 bg-pwgreen-800 hover:bg-green-50 hover:text-pwgreen-800 font-medium rounded-lg text-sm px-4 py-2.5 flex gap-2 items-center"
                type="button">
                <Image
                    src={userPicture ?? ''}
                    alt="not found"
                    width={32}
                    height={32}
                    className="rounded-full"
                />
                {userName}
            </button>
            {dropdown ? (
                <div className="absolute top-14 left-0 z-10 w-full bg-pwgreen-700 rounded divide-y divide-slate-100 shadow-lg">
                    <div className="py-3 px-4 text-sm text-gray-900 dark:text-white">
                        <div className="font-medium truncate">{userEmail}</div>
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
                        <Link href={'/api/auth/logout'}>
                            <a
                                className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                                Cerrar sesión
                            </a>
                        </Link>
                    </div>
                </div>
            ) : null}
        </div>
    )
}

export default UserButton
