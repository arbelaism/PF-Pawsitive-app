import React from 'react'
import { DashboardLayout } from 'components/dashboard'
import { TableMyTransaction } from 'components/dashboard'
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'

const MyTransaction = withPageAuthRequired(() => {
    return (
        <DashboardLayout title="Tus compras">
            <TableMyTransaction />
        </DashboardLayout>
    )
})

export default MyTransaction
