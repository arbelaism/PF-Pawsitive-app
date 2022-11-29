import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';
import { IAdoption } from 'app/types';
import { MainLayout, AdoptionCard, Filters } from 'components';
import {useQuery} from 'react-query';
import {getAdoptions} from 'utils/dbFetching'

export type Props = {
    [key: string]: any
}

const Adoptions: NextPage = () => {
    const {data: adoptions, error, isLoading} = useQuery(['adoptions'], getAdoptions);

    return (
        <MainLayout title="Pawsitive - Adoptions">
            <div className="px-4 py-2 w-full flex justify-between items-center">
                <h1 className="text-3xl font-bold">Adoptions</h1>
                <Link href={'/create'}>
                    <a className="font-bold underline">Poner en adopción</a>
                </Link>
            </div>

            {/*FILTROS*/}
            {/* FIX: FIX THIS */}
            {/* <Filters adoptions={adoptions} /> */}

            <div className="flex flex-wrap justify-end items-center">
                {isLoading ? <h1>Cargando...</h1>
                    : adoptions.map((adoption: IAdoption) => {
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
                    })}
            </div>
        </MainLayout>
    )
}

export default Adoptions
