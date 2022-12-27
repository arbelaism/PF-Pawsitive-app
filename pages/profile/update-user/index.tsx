import { DashboardLayout } from 'components/dashboard'
import UserUpdate from 'components/dashboard/dashboardUser/UpdateUser'
import { NextPage } from 'next/types'
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'

const UpdateUser: NextPage = withPageAuthRequired(() => {
    return (
        <DashboardLayout title="Actualizar mis datos">
            <UserUpdate />
        </DashboardLayout>
    )
})

export default UpdateUser
