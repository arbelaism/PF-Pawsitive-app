import React from 'react'
import { DashboardLayout } from 'components/dashboard'
import { TableMyAdoptionPets } from 'components/dashboard'
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'

const MyAdoption = withPageAuthRequired(() => {
    return (
        <DashboardLayout title="Tus adopciones">
            <TableMyAdoptionPets />
        </DashboardLayout>
    )
})

export default MyAdoption
