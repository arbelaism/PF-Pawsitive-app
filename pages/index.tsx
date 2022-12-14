import type { NextPage } from 'next'
import { MainLayout, AdoptionsScreen, ProductsScreen } from 'components'
import { useUser } from '@auth0/nextjs-auth0/client'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { createUser, getAuth0Users } from 'utils/dbFetching'
import { checkEmail } from 'utils/checkEmail'
import { useEffect } from 'react'
// import createDB from '../utils/createDB'

const Home: NextPage = () => {
    // createDB()

    const { user, error, isLoading } = useUser()
    // const queryClient = useQueryClient()
    const { mutate } = useMutation((data: any) => createUser(data))

    // const { data: auth0Users } = useQuery(['auth0Users'], getAuth0Users)

    // if (auth0Users) {
    //     auth0Users.forEach((u: any) => {
    //         const data = {
    //             id: u.id,
    //             firstName: '',
    //             lastName: '',
    //             email: u.email,
    //             email_verified: u.email_verified,
    //             photo: u.photo,
    //             createdAt: u.createdAt,
    //             updatedAt: u.updatedAt
    //         }
    //         // mutate(data)
    //     })
    // }

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
