import React from 'react'
import { DashboardLayout } from 'components/dashboard'
import{TableMyAdoptionPets} from 'components/dashboard'
const MyAdoption = () => {
    return (
        <DashboardLayout title="Perfil">
           <TableMyAdoptionPets />
        </DashboardLayout>
    )
}

export default MyAdoption
