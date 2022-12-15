import { useUser } from '@auth0/nextjs-auth0/client'
import React from 'react'
import { UserButton } from 'components'
import { checkEmail } from 'utils/checkEmail'
import { HamburguerIcon } from 'components'
import Link from 'next/link'
import { FaArrowLeft } from 'react-icons/fa'

type Props = {
    title: string
}

const Header = ({ title }: Props) => {
    const { user } = useUser()

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

    return (
        <div className="w-full z-20 bg-pwgreen-100 p-4 flex items-center justify-between sticky top-0 border border-b-pwgreen-800 border-opacity-30 shadow-md lg:static lg:border-none">
            <div className="flex gap-2 items-center">
                <div className="mx-3 lg:hidden">
                    <HamburguerIcon />
                </div>
                <Link href={'/'}>
                    <a className='text-xl border rounded-full border-pwgreen-700 p-2 text-pwgreen-700 hover:bg-pwgreen-700 hover:text-pwgreen-100 transition-colors'>
                        <FaArrowLeft />
                    </a>
                </Link>
                <h1 className="font-Rubik text-2xl text-pwgreen-900 font-semibold p-2 lg:text-4xl">
                    {title}
                </h1>
            </div>
            <UserButton
                userName={name ?? ''}
                userEmail={email ?? ''}
                userPicture={user?.picture ?? ''}
            />
        </div>
    )
}

export default Header
