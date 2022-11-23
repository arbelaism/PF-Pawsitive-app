import type { NextPage } from 'next'
import { MainLayout } from '../components'

const Home: NextPage = () => {
    return (
        <MainLayout title="Pawsitive - Home">
            <div>
                <h1>Home component</h1>
            </div>
        </MainLayout>
    )
}

export default Home
