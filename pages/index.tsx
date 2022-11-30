import type { NextPage } from 'next'
import { MainLayout, AdoptionsScreen } from 'components'
//import createDB from '../utils/createDB'

const Home: NextPage = () => {
   // createDB()

    return (
        <MainLayout title="Pawsitive - Home">
            <AdoptionsScreen />
        </MainLayout>
    )
}

export default Home
