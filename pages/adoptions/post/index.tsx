import { NextPage } from 'next'
import { MainLayout } from 'components'
import AdoptionForm from 'components/adoptions/AdoptionForm'
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'

const Apply: NextPage = withPageAuthRequired(() => {
    return (
        <MainLayout title="Pawsitive - Adoptions Apply">
            <AdoptionForm />
        </MainLayout>
    )
})

export default Apply
