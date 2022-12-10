import { useUser } from '@auth0/nextjs-auth0/client'
import React, { useState } from 'react'
import { UserButton } from 'components'
import { checkEmail } from 'utils/checkEmail'

type Props = {
    title: string
}

const Header = ({ title }: Props) => {
    const [dropdown, setDropdown] = useState(false)
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
        <div className="p-8 flex items-center justify-between">
            <h1 className="font-Rubik text-3xl text-pwgreen-900 font-semibold p-2">
                {title}
            </h1>
            <h3 className="font-Rubik text-xl">Bienvenido, {user?.name}</h3>

            <UserButton
                userName={name ?? ''}
                userEmail={email ?? ''}
                userPicture={user?.picture ?? ''}
            />
        </div>
    )
}

export default Header
