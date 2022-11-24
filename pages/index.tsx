import type { NextPage } from 'next'
import { MainLayout } from '../components'
//import createDB from '../createDB'

const Home: NextPage = () => {
    //createDB()

    return (
        <MainLayout title="Pawsitive - Home">
            <div>
                <h1>Home component</h1>
            </div>
        </MainLayout>
    )
}

export default Home
