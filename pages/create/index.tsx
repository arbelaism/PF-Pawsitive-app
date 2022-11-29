import React from 'react'
import { NextPage } from 'next'
import { AdoptionForm, MainLayout } from 'components'

const Create: NextPage = () => {
    return (
        <MainLayout title="Create">
            <AdoptionForm />
        </MainLayout>
    )
}

export default Create
