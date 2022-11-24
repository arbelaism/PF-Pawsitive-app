import type { NextPage } from 'next'
import { AdoptionCard, MainLayout } from '../components'

const Home: NextPage = () => {
    return (
        <MainLayout title="Pawsitive - Home">
            {/* <div className="flex flex-wrap"> */}
            {/*     {adoptions */}
            {/*         ? adoptions.map(adoption => { */}
            {/*               return adoption.active ? ( */}
            {/*                   <AdoptionCard */}
            {/*                       key={adoption.id} */}
            {/*                       name={adoption.name} */}
            {/*                       size={adoption.size} */}
            {/*                       age={adoption.age} */}
            {/*                       breed={adoption.breed} */}
            {/*                       photo={adoption.photo} */}
            {/*                       active={adoption.active} */}
            {/*                   /> */}
            {/*               ) : null */}
            {/*           }) */}
            {/*         : null} */}
            {/* </div> */}
        </MainLayout>
    )
}

export default Home
