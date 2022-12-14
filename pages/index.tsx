import type { NextPage } from 'next'
import { MainLayout } from 'components'
import Hero from 'components/home/Hero'
import Pets from 'components/home/Pets'
import Services from 'components/home/Services'
import AdoptionScreen from 'components/home/AdoptionScreen'
import Newsletter from 'components/home/Newsletter'

// import createDB from '../utils/createDB'

const Home: NextPage = () => {
//    createDB()

    return (
        <MainLayout title="Pawsitive - Home">
            <Hero/>
            <Pets/>
            <Services/>
            <AdoptionScreen/>
            <Newsletter/>
        </MainLayout>
    )
}

export default Home
