import { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import React from 'react'
import { MainLayout, AdoptionCard, AdoptionsComponent, Pagination } from '../components'

type Adop = {
    [key: string]: any
}

type User = {
    name: string
    lastName: string
    email: string
}

type Adoption = {
    id: number
    name: string
    size: string
    age: string
    breed: string
    photo: string
    active?: boolean
    userAdop: User
}

export const getServerSideProps: GetServerSideProps<{
    adoptions: Adoption
}> = async () => {
    const response = await fetch(
        'http://localhost:3000/api/read/adoptionposts/all'
    )

    const adoptions: Adoption = await response.json()

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

const Adoptions: NextPage = ({ adoptions }: Adop) => {
    return (
        <MainLayout title="Pawsitive - Adoptions">
            <div className="px-4 py-2 w-full flex justify-between items-center">
                <h1 className="text-3xl font-bold">Adoptions</h1>
                <Link href={'/create'}>
                    <a className="font-bold underline">Poner en adopción</a>
                </Link>
            </div>

            {/*FILTROS*/}
            <AdoptionsComponent />

            <div className="flex flex-wrap justify-end items-center">
                <Pagination data={adoptions} pageLimit={3} dataLimit={6} />


                {/* {adoptions.length > 1
                    ? adoptions.map((adoption: Adoption) => {
                          return (
                              <AdoptionCard
                                  key={adoption.id}
                                  name={adoption.name}
                                  size={adoption.size}
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
