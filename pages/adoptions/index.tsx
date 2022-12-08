import { NextPage } from 'next'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { IAdoption } from 'app/types'
import { MainLayout, AdoptionCard, Filters } from 'components'
import { useQuery } from 'react-query'
import { getAdoptions } from 'utils/dbFetching'
import AlternativePagination from 'components/layout/AlternativePagination'
import NotFound from 'public/mong03b.gif'
import Image from 'next/image'

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
    }, [isSuccess, adoptions])

    return (
        <MainLayout title="Pawsitive - Adopciones">
            <div className="px-4 py-2 w-full flex justify-between items-center bg-pwgreen-100">
                <h1 className="text-3xl font-bold">Adopciones</h1>
                <Link href={'/adoptions/create'}>
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
                <div className="flex grow flex-col justify-center items-center bg-pwgreen-100">
                    {!isLoading && currentItems ? (
                        <AlternativePagination
                            totalItems={(data ? data : adoptions)?.length}
                            itemsPerPage={itemsPerPage}
                            setCurrentPage={setCurrentPage}
                        />
                    ) : null}
                    <div className="flex flex-wrap justify-center items-center bg-pwgreen-100">
                        {isLoading ? (
                            <h1>Loading...</h1>
                        ) : currentItems.length === 0 ? (
                            <div className="flex flex-col justify-center items-center">
                                <h1 className="font-bold text-3xl">
                                    No encontramos items
                                </h1>
                                <Image
                                    src={NotFound}
                                    alt="not found"
                                    width={500}
                                    height={400}
                                />
                            </div>
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
