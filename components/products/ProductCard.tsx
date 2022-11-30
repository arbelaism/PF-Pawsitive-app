import React from 'react'
import Image from 'next/image'
import { Product, UserProduct } from 'app/types';
import styles from 'styles/ProductCard.module.css'
import Link from 'next/link'
import { style } from '@mui/system';
import { CartItemType } from "pages/products";

type Props = {  
    product : Product  
    handleAddToCart: (clickedItem: CartItemType) => void;
}

const ProductCard = ( product : Product, {handleAddToCart} : Props) => {
    return (
        <div className={styles.cardContainer} key={id}>
            <div className={styles.card}>
                <Image
                    src={photo}
                    alt="No image to display"
                    width={150}
                    height={150}
                    className={styles.cardImage}
                />
                <h2 className={styles.title}>{name}</h2>
                <p className={styles.text}>Tamaño: {size}</p>
                <p className={styles.text}>Descripcion: {description}</p>
                <p className={styles.text}>Precio: ${price}</p>
                <h3 className={styles.title}>Vendedor: {user.firstName +' '+user.lastName}</h3>
                <button className={styles.button} onClick={() => handleAddToCart(item)}>Agregar al carrito</button>
                
            </div>
        </div>
    )
}

export default ProductCard;
