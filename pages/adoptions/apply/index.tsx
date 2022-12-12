import { NextPage } from 'next'
import { MainLayout } from 'components'
import AdoptionApply from 'components/adoptions/AdoptionApply';

const Apply: NextPage = () => {
    

    return (
        <MainLayout title="Pawsitive - Adoptions Apply">
            <AdoptionApply/>
        </MainLayout>
    )
}

export default Apply;