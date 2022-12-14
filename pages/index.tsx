import type { NextPage } from 'next'
import { MainLayout } from 'components'
import Hero from 'components/home/Hero'
import Pets from 'components/home/Pets'
import Services from 'components/home/Services'
import AdoptionScreen from 'components/home/AdoptionScreen'
import Newsletter from 'components/home/Newsletter'
import { useUser } from '@auth0/nextjs-auth0/client'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { createUser, getAuth0UserById, getAuth0Users } from 'utils/dbFetching'
import { useEffect } from 'react'
// import createDB from '../utils/createDB'

const Home: NextPage = () => {
    // createDB()

    const { user, error } = useUser()
    const { mutate } = useMutation((data: any) => createUser(data), {
        onSettled: () => {
            queryClient.invalidateQueries('auth0User')
        }
    })
    const queryClient = useQueryClient()

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

    let id: string = ''
    if (user && user.sub) {
        id = user.sub
    }

    const { data: auth0User, isLoading } = useQuery(['auth0User', id], () =>
        getAuth0UserById(id)
    )

    // let email: string = ''
    // let nickname: string = ''
    // if (user && user.sub && user.nickname && user.name) {
    //     email = checkEmail(user.sub, user.nickname)

    //     if (email && email === 'auth0') {
    //         email = user.name
    //     }
    // }

    useEffect(() => {
        if (!isLoading && user && auth0User) {
            const data = {
                id: auth0User.user_id,
                firstName: auth0User.given_name || '',
                lastName: auth0User.family_name || '',
                email: auth0User.email,
                email_verified: auth0User.email_verified,
                photo: auth0User.picture
            }

            console.log(data)

            mutate(data)
        }
    }, [auth0User, id])

    return (
        <MainLayout title="Pawsitive - Home">
            <Hero/>
            <Pets/>
            <Services/>
            <AdoptionScreen/>
            <Newsletter/>
        </MainLayout>
    )
}

export default Home
