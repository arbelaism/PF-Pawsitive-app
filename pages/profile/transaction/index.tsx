import React from 'react'
import { DashboardLayout } from 'components/dashboard'
import{TableMyTransaction} from 'components/dashboard'
const Profile = () => {
    return (
        <DashboardLayout title="Perfil">
            <TableMyTransaction />
        </DashboardLayout>
    )
}

export default Profile
