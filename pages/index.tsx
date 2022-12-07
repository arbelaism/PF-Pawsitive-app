import type { NextPage } from 'next'
import { MainLayout, AdoptionsScreen, ProductsScreen } from 'components'
//import createDB from '../utils/createDB'

const Home: NextPage = () => {
   // createDB()

    return (
        <MainLayout title="Pawsitive - Home">
            <AdoptionsScreen />
            <ProductsScreen />
        </MainLayout>
    )
}

export default Home
