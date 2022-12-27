import { DashboardLayout, Profile } from 'components/dashboard'
import { NextPage } from 'next'
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'

const UserProfile: NextPage = withPageAuthRequired(() => {
    return (
        <DashboardLayout title="Mi Perfil">
            <Profile />
        </DashboardLayout>
    )
})

export default UserProfile
