import { DashboardLayout } from 'components/dashboard'
import { TableTransaction } from 'components/dashboard'
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client'
import { useQuery } from 'react-query'
import { getUserById } from 'utils/dbFetching'
import { useEffect } from 'react'
import { redirectionAlert } from 'utils/alerts'
import { useRouter } from 'next/router'

const Transactions = withPageAuthRequired(() => {
    const { user } = useUser()
    const router = useRouter()

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
            setTimeout(() => {
                router.push('/profile')
            }, 1000)
        }
    }, [isLoading])

    return (
        <DashboardLayout title="Transacciones">
            <TableTransaction />
        </DashboardLayout>
    )
})
export default Transactions
