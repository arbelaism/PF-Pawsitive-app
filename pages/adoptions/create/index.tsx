import React from 'react'
import { NextPage } from 'next'
import { AdoptionForm, MainLayout } from 'components'
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'

const  Create : NextPage = withPageAuthRequired(() => {
    return (
        <MainLayout title="Create">
            <AdoptionForm />
        </MainLayout>
    )
})

export default Create
