import React from 'react'
import { DashboardLayout } from 'components/dashboard'
import{TableMyAdoptionPets} from 'components/dashboard'
const Profile = () => {
    return (
        <DashboardLayout title="Perfil">
           <TableMyAdoptionPets />
        </DashboardLayout>
    )
}

export default Profile
