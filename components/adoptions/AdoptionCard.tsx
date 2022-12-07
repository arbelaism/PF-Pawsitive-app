import React from 'react'
import Image from 'next/image'
import styles from 'styles/AdoptionCard.module.css'
import LinkAdoption from './LinkAdoption'
import placeholder from "public/256px-Black_Paw.svg.png"
import Link from 'next/link'
import product from 'pages/api/product'

type Adoption = {
    id: string
    name: string
    size: string
    age: string
    breed: string
    photo: string
}

const AdoptionCard = ({id, name, size, age, breed, photo }: Adoption) => {
    return (
        <div className="flex flex-col justify-between items-center m-5 bg-white shadow-2xl rounded-xl w-60 h-auto " key={id}>
            <div className='h-1/8'>
                <Image
                    src={photo ? photo : placeholder}
                    alt="No image to display"
                    width='30%'
                    height='30%'
                    layout='responsive'
                    objectFit='cover'
                    className="rounded-full"
                />
                <h2 className="text-gray-900 font-Rubik text-xl font-medium capitalize">{name}</h2>
                <p className="text-gray-900 font-Rubik">Size: {size}</p>
                <p className="text-gray-900 font-Rubik">Age: {age}</p>
                <p className="text-gray-900 font-Rubik hidden">Breed: {breed}</p>
                {/* <Link href={`/adoptions/${id}`}> */}
                    <a>
                        <LinkAdoption id={id}/>
                    </a>
                {/* </Link> */}
            </div>
        </div>
    )
}

export default AdoptionCard
