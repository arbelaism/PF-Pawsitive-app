import { useUser } from '@auth0/nextjs-auth0/client'
import React from 'react'
import { UserButton } from 'components'
import { checkEmail } from 'utils/checkEmail'
import { HamburguerIcon } from 'components'

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
        <div className="w-full bg-pwgreen-100 p-4 flex items-center justify-between sticky top-0 border border-b-pwgreen-800 border-opacity-30 lg:static lg:border-none">
            <div className="flex items-center">
                <div className="mx-3 lg:hidden">
                    <HamburguerIcon />
                </div>
                <h1 className="font-Rubik text-xl text-pwgreen-900 font-semibold p-2 lg:text-3xl">
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
