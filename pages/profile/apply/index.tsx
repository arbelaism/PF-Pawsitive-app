import React from 'react'
import { DashboardLayout } from 'components/dashboard'
import { MyApplyAdoption } from 'components/dashboard'
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'

const MyApply = withPageAuthRequired(() => {
    return (
        <DashboardLayout title="Tus aplicaciones">
            <MyApplyAdoption />
        </DashboardLayout>
    )
})

export default MyApply
