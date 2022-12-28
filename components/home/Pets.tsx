import React, { useState } from 'react'
import Image from 'next/image'

import Pet1Img from 'public/img/pets/1.png'
import { useQuery } from 'react-query'
import { getAdoptions } from 'utils/dbFetching'
import Link from 'next/link'

const pets = [
    {
        id: 1,
        category: 'gato',
        name: 'kyba',
        photo: Pet1Img
    }
]

const Pets = () => {
    const {
        data: adoptions,
        error,
        isLoading,
        isSuccess
    } = useQuery(['adoptions'], getAdoptions)

    let data: any = []
    if (!isLoading) data = adoptions.slice(0, 13)

    const [petDetails, setPetDetails] = useState(pets[0])
    const [petIndex, setPetIndex] = useState(8)
    const getPetDetails = (id: any) => {
        const pet: any = data.find((pet: any) => {
            return pet.id === id
        })

        setPetDetails(pet)
    }

    return (
        <section className="bg-pets bg-center py-12 overflow-hidden relative lg:py-16 xl:py-20">
            <div className="flex flex-col lg:flex-row">
                <div className="hidden xl:flex xl:w-[30%] xl:pl-[160px]">
                    <h1 className="title">Algunas de nuestras mascotas</h1>
                </div>
                {isLoading ? (
                    <h1>Loading</h1>
                ) : (
                    <div className="flex-1 flex flex-col lg:flex-row">
                        <div className="lg:w-[30%] flex flex-col justify-center items-end pb-6 lg:py-2 mx-auto lg:mx-0 ">
                            <div className="text-center text-pwgreen-50">
                                <div className="text-[17px] font-bold uppercase mb-1">
                                    {petDetails?.name}
                                </div>
                                <div className="w-[150px] h-[150px] mx-auto lg:mx-0 border-4 border-white rounded-full overflow-hidden">
                                    <Image
                                        src={petDetails.photo || ''}
                                        objectFit={'cover'}
                                        width={150}
                                        height={150}
                                        alt="no hay imagen que mostrar"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="relative lg:w-[60%] flex-1 lg:flex items-center">
                            <div className="flex flex-wrap gap-4 justify-center lg:justify-end lg:mr-4">
                                {data.map((pet: any, index: any) => {
                                    return (
                                        <div
                                            key={index}
                                            onClick={() => {
                                                setPetIndex(index),
                                                    getPetDetails(pet.id)
                                            }}
                                            className="cursor-pointer relative overflow-hidden rounded-full">
                                            <div
                                                className={`w-full h-full absolute rounded-full ${
                                                    petIndex === index
                                                        ? 'border-2 border-white'
                                                        : 'bg-black/40'
                                                }`}></div>
                                            <Image
                                                src={pet.photo}
                                                objectFit={'cover'}
                                                width={80}
                                                height={80}
                                                alt=""
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="text-end absolute right-4 bottom-4">
                <Link href="/adoptions">
                    <button className="font-Rubik uppercase text-base font-bold py-2 px-3 text-white hover:text-pwgreen-900 duration-300 lg:text-xl">
                        Ver más
                    </button>
                </Link>
            </div>
        </section>
    )
}

export default Pets
