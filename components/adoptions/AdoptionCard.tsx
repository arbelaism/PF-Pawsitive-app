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
            className="flex flex-col justify-between w-full items-center bg-white shadow-md rounded-md hover:shadow-2xl lg:w-64 transition-all"
            key={id}>
            <div className="flex items-center justify-between px-2 gap-3 py-4 lg:flex-col lg:px-3">
                <div className="flex w-1/3 lg:w-2/3">
                    <Image
                        src={photo ? photo : placeholder}
                        alt="No hay imagen para mostrar"
                        width={256}
                        height={256}
                        objectFit={'cover'}
                        objectPosition={'static'}
                        className="rounded-full static"
                    />
                </div>
                <div className="flex flex-col justify-between w-2/3 lg:w-full">
                    <h2 className="text-gray-900 font-Rubik text-xl font-medium capitalize">
                        {name}
                    </h2>
                    <p className="text-pwgreen-900 font-Rubik">
                        Tamaño: {size}
                    </p>
                    <p className="text-pwgreen-900 font-Rubik">Edad: {age}</p>
                    <p className="text-pwgreen-900 font-Rubik hidden">
                        Raza: {breed}
                    </p>
                </div>
            </div>
            <div className="w-full">
                <a>
                    <LinkAdoption id={id} />
                </a>
            </div>
        </div>
    )
}

export default AdoptionCard
