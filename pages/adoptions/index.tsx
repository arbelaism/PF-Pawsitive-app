import { NextPage } from 'next'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { IAdoption } from 'app/types'
import { MainLayout, AdoptionCard, Filters } from 'components'
import { useQuery } from 'react-query'
import { getAdoptions } from 'utils/dbFetching'
import AlternativePagination from 'components/layout/AlternativePagination'

export type Props = {
    [key: string]: any
}

const Adoptions: NextPage = () => {
    const {
        data: adoptions,
        error,
        isLoading,
        isSuccess
    } = useQuery(['adoptions'], getAdoptions)

    //Pagination with Data o Adoptions
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [itemsPerPage, _setItemsPerPage] = useState<number>(6)
    const [data, setData] = useState<IAdoption[]>()

    const lastItemIndex = currentPage * itemsPerPage
    const firstItemIndex = lastItemIndex - itemsPerPage
    let currentItems: IAdoption[] = []
    if (data) currentItems = [...data.slice(firstItemIndex, lastItemIndex)]

    useEffect(() => {
        if (isSuccess) {
            setData(adoptions)

        }
    }, [isSuccess, adoptions]

    )


    return (
        <MainLayout title="Pawsitive - Adoptions">
            <div className="px-4 py-2 w-full flex justify-between items-center">
                <h1 className="text-3xl font-bold">Adoptions</h1>
                <Link href={'/create'}>
                    <a className="font-bold underline">Poner en adopción</a>
                </Link>
            </div>

            <div className="flex">
                <div className="w-64">
                    <Filters
                        setData={setData}
                        data={data}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
                <div className="flex grow flex-col justify-center items-center">
                    {!isLoading && currentItems ? (
                        <AlternativePagination
                            totalItems={(data ? data : adoptions)?.length}
                            itemsPerPage={itemsPerPage}
                            setCurrentPage={setCurrentPage}
                        />
                    ) : null}
                    <div className="grid grid-cols-3 justify-center items-center">
                        {isLoading ? (
                            <h1>Loading...</h1>
                        ) : (
                            currentItems.map((adoption: IAdoption) => {
                                return (
                                    <AdoptionCard
                                        key={adoption.id}
                                        id={adoption.id}
                                        name={adoption.name}
                                        size={adoption.size.toLowerCase()}
                                        age={adoption.age}
                                        breed={adoption.breed}
                                        photo={adoption.photo}
                                    />
                                )
                            })
                        )}
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default Adoptions
