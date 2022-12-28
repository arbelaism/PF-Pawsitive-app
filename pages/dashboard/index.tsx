import {
    DashboardLayout,
    SalePerMontPrice,
    SalePerMontProduct,
    ProductMoreSold,
    BalancePerMont,
    BalanceCurrentMont,
    RegisterAdoptions,
    RegisterUser
} from '../../components/dashboard'
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client'
import { useQuery } from 'react-query'
import { getUserById } from 'utils/dbFetching'
import { redirectionAlert } from 'utils/alerts'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

// import BarGraphic from "components/dashboard/graphics/BarGraphic"

const DashboardAdm = withPageAuthRequired(() => {
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
        <DashboardLayout title="Resumen">
            <div className="w-full">
                <div className="px-7 my-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
                    <ProductMoreSold />
                    <BalancePerMont />
                </div>
                <div className="px-7 my-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
                    <RegisterAdoptions />
                    <RegisterUser />
                </div>
                <div className="px-7 my-5 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                    <SalePerMontPrice />
                    <SalePerMontProduct />
                    <BalanceCurrentMont />
                </div>
            </div>
        </DashboardLayout>
    )
})
export default DashboardAdm
