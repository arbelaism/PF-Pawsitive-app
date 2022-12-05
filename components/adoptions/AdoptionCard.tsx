import React from 'react'
import Image from 'next/image'
import styles from 'styles/AdoptionCard.module.css'
import LinkAdoption from './LinkAdoption'
import placeholder from "public/256px-Black_Paw.svg.png"

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
        <div className={styles.cardContainer} key={id}>
            <div className={styles.card}>
                <Image
                    src={photo ? photo : placeholder}
                    alt="No image to display"
                    width={150}
                    height={150}
                    className={styles.cardImage}
                />
                <h2 className={styles.title}>{name}</h2>
                <p className={styles.text}>Size: {size}</p>
                <p className={styles.text}>Age: {age}</p>
                <p className={styles.text}>Breed: {breed}</p>
                <div className={styles.adoptButton}></div>
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
