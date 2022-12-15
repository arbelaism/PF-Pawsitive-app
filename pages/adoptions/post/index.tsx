import { NextPage } from 'next'
import { MainLayout } from 'components'
import AdoptionForm from 'components/adoptions/AdoptionForm'

const Apply: NextPage = () => {
    return (
        <MainLayout title="Pawsitive - Adoptions Apply">
            <AdoptionForm />
        </MainLayout>
    )
}

export default Apply
