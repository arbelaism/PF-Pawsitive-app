import React from 'react'
import Image from 'next/image'
import LinkAdoption from './LinkAdoption'
import placeholder from 'public/iso-green.svg'
type Adoption = {
    id: string
    name: string
    size: string
    age: string
    breed: string
    photo: string
}

const AdoptionCard = ({ id, name, size, age, breed, photo }: Adoption) => {
    return (
        <div
            className="flex flex-col justify-between w-60 items-center bg-white shadow-md rounded-xl my-2 md:my-4 hover:shadow-xl transition-all"
            key={id}>
            <div className="flex flex-col justify-between gap-1 py-4">
                <Image
                    src={photo ? photo : placeholder}
                    alt="No hay imagen para mostrar"
                    width={64}
                    height={64}
                    layout="responsive"
                    objectFit="cover"
                    objectPosition={'static'}
                    className="rounded-full static"
                />
                <h2 className="text-gray-900 font-Rubik text-xl font-medium capitalize">
                    {name}
                </h2>
                <p className="text-pwgreen-900 font-Rubik">Tamaño: {size}</p>
                <p className="text-pwgreen-900 font-Rubik">Edad: {age}</p>
                <p className="text-pwgreen-900 font-Rubik hidden">Raza: {breed}</p>
                <a>
                    <LinkAdoption id={id} />
                </a>
            </div>
        </div>
    )
}

export default AdoptionCard
