import React from 'react'
import { DashboardLayout } from 'components/dashboard'
import {UserUpdate} from 'components/dashboard'
const Profile = () => {
    return (
        <DashboardLayout title="Perfil">
            <UserUpdate />
        </DashboardLayout>
    )
}

export default Profile
