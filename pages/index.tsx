import type { NextPage } from 'next'
import { MainLayout, AdoptionsScreen, ProductsScreen } from 'components'
import { useUser } from '@auth0/nextjs-auth0/client'
import { useMutation, useQueryClient } from 'react-query'
import { createUser } from 'utils/dbFetching'
import { checkEmail } from 'utils/checkEmail'
import { useEffect } from 'react'
// import createDB from '../utils/createDB'

const Home: NextPage = () => {
    //    createDB()

    const { user, error, isLoading } = useUser()
    // const queryClient = useQueryClient()
    const { mutate } = useMutation((data: any) => createUser(data))

    let email: string = ''
    let nickname: string = ''
    if (user && user.sub && user.nickname && user.name) {
        email = checkEmail(user.sub, user.nickname)

        if (email && email === 'auth0') {
            email = user.name
        }
    }

    useEffect(() => {
        if (user && email) {
            const data = {
                id: user?.sub,
                firstName: user?.given_name || '',
                lastName: user?.family_name || '',
                email: email,
                photo: user?.picture
            }

            console.log(data)
            mutate(data)
        }
    }, [email, user?.sub])

    return (
        <MainLayout title="Pawsitive - Home">
            <AdoptionsScreen />
            <ProductsScreen />
        </MainLayout>
    )
}

export default Home
