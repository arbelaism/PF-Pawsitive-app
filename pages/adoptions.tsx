import { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import React from 'react'
import { IAdoption } from 'app/types'
import { MainLayout, Pagination } from 'components'
import Filters from 'components/Filters'

export type Props = {
    [key: string]: any
}

export const getServerSideProps: GetServerSideProps<{
    adoptions: IAdoption
}> = async () => {
    const response = await fetch(
        'http://localhost:3000/api/read/adoptionposts/all'
    )

    const adoptions: IAdoption = await response.json()

    if (!adoptions) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            adoptions
        }
    }
}

const Adoptions: NextPage = ({ adoptions }: Props) => {
    // const ctx = useContext(AppContext)
    // const [state, dispatch] = useReducer(reducer, ctx)
    //
    // // TODO: Refactor
    // useEffect(() => {
    //     fetchAdoptions().then(value => {
    //         dispatch({ type: FETCH_ADOPTIONS, payload: value })
    //     })
    // }, [dispatch])

    // const { adoptions } = state

    return (
        <MainLayout title="Pawsitive - Adoptions">
            <div className="px-4 py-2 w-full flex justify-between items-center">
                <h1 className="text-3xl font-bold">Adoptions</h1>
                <Link href={'/create'}>
                    <a className="font-bold underline">Poner en adopción</a>
                </Link>
            </div>

            {/*FILTROS*/}
            <Filters adoptions={adoptions} />

            <div className="flex flex-wrap justify-end items-center">
                {/* {adoptions.length > 1
                    ? adoptions.map((adoption: Adoption) => {
                          return (
                              <AdoptionCard
                                  key={adoption.id}
                                  name={adoption.name}
                                  size={adoption.size.toLowerCase()}
                                  age={adoption.age}
                                  breed={adoption.breed}
                                  photo={adoption.photo}
                              />
                          )
                      })
                    : null} */}
            </div>
        </MainLayout>
    )
}

export default Adoptions
