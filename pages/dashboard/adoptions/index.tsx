import { DashboardLayout } from 'components/dashboard'
import { TableAdoption } from 'components/dashboard'
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client'
import { useQuery } from 'react-query'
import { getUserById } from 'utils/dbFetching'
import { redirectionAlert } from 'utils/alerts'
import { useEffect } from 'react'

const Adoptions = withPageAuthRequired(() => {
    const { user } = useUser()

    let id: string = ''
    if (user && user.sub) {
        id = user.sub
    }
    const { data: dbUser, isLoading } = useQuery(['user', id], () =>
        getUserById(id)
    )

    useEffect(() => {
        if (!isLoading && dbUser.role !== 'ADMIN') {
            redirectionAlert({
                icon: 'warning',
                title: 'Acceso prohibido',
                text: 'Esta ruta es solo para administradores de la página.',
                showCloseButton: false,
                showCancelButton: false,
                link: '/profile'
            })
        }
    }, [isLoading])

    return (
        <DashboardLayout title="Adopciones">
            <TableAdoption />
        </DashboardLayout>
    )
})

export default Adoptions
