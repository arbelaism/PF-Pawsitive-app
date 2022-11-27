import { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import React, { useContext, useEffect, useReducer } from 'react'
import { fetchAdoptions } from '../app/actions'
import { FETCH_ADOPTIONS } from '../app/constants'
import { reducer } from '../app/reducer'
import AppContext from '../app/store'
import { MainLayout, AdoptionCard } from '../components'
import { IAdoption } from '../types/index'

// export const getServerSideProps: GetServerSideProps<{
//     adoptions: IAdoption
// }> = async () => {
//     const response = await fetch(
//         'http://localhost:3000/api/read/adoptionposts/all'
//     )

//     const adoptions: IAdoption = await response.json()

//     if (!adoptions) {
//         return {
//             notFound: true
//         }
//     }

//     return {
//         props: {
//             adoptions
//         }
//     }
// }

const Adoptions: NextPage = () => {
    const ctx = useContext(AppContext)
    const [state, dispatch] = useReducer(reducer, ctx)

    useEffect(() => {
        dispatch(fetchAdoptions())
    }, [dispatch])

    const { adoptions } = state

    return (
        <MainLayout title="Pawsitive - Adoptions">
            <div className="px-4 py-2 w-full flex justify-between items-center">
                <h1 className="text-3xl font-bold">Adoptions</h1>
                <Link href={'/create'}>
                    <a className="font-bold underline">Poner en adopción</a>
                </Link>
            </div>

            {/*FILTROS*/}
            {/* <AdoptionsComponent /> */}

            <div className="flex flex-wrap justify-center items-center">
                {adoptions.length > 1
                    ? adoptions.map((adoption: IAdoption) => {
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
                    : null}
            </div>
        </MainLayout>
    )
}

export default Adoptions
