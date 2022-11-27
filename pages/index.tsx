import type { NextPage } from 'next'
import { MainLayout, AdoptionsScreen } from '../components'
// import createDB from '../createDB'

const Home: NextPage = () => {
    // createDB()

    //createDB()

    return (
        <MainLayout title="Pawsitive - Home">
            <AdoptionsScreen />
        </MainLayout>
    )
}

export default Home
