import React from 'react'
import Image from 'next/image'
import styles from '../styles/AdoptionCard.module.css'

type Adoption = {
    name: string
    size: string
    age: string
    breed: string
    photo: string
    active: boolean
}

const AdoptionCard = ({ name, size, age, breed, photo, active }: Adoption) => {
    return (
        <div className={styles.cardContainer}>
            {active ? (
                <div className={styles.card}>
                    <Image
                        src={photo}
                        alt="No image to display"
                        width={150}
                        height={150}
                        className={styles.cardImage}
                    />
                    <h2 className={styles.title}>{name}</h2>
                    <p className={styles.text}>Size: {size}</p>
                    <p className={styles.text}>Age: {age}</p>
                    <p className={styles.text}>Breed: {breed}</p>
                </div>
            ) : null}
        </div>
    )
}

export default AdoptionCard
