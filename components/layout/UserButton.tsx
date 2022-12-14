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
        <div className="w-max relative">
            <button
                onClick={showMenu}
                className="w-max text-pwgreen-50 bg-pwgreen-600 hover:bg-pwgreen-800 font-medium rounded-lg text-sm px-4 py-2.5 flex gap-2 items-center transition-all"
                type="button">
                <Image
                    src={userPicture}
                    alt="not found"
                    width={24}
                    height={24}
                    className="rounded-full"
                />
                <span className="hidden md:block">{userName}</span>
            </button>
            <div
                id="dropdown"
                className="absolute top-14 border border-pwgreen-500 hidden right-0 z-40 w-max bg-pwgreen-50 rounded divide-y divide-slate-200 shadow-lg transition-all">
                <div className="py-3 px-4 text-sm text-pwgreen-800">
                    <div className="font-medium truncate">{userEmail}</div>
                </div>
                <ul
                    className="text-sm text-pwgreen-800"
                    aria-labelledby="dropdownInformationButton">
                    <li>
                        <Link href={'/profile'}>
                            <a className="block py-3 px-4 hover:bg-pwgreen-600 hover:text-pwgreen-50 transition-colors">
                                Perfil
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
                    <li>
                        <Link href={'/profile/settings'}>
                            <a className="block py-3 px-4 hover:bg-pwgreen-600 hover:text-pwgreen-50 transition-colors">
                                Configuración
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
