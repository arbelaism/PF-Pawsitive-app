import React from 'react'
import Image from 'next/image'
import { Product, UserProduct } from 'app/types';
import styles from 'styles/ProductCard.module.css'
import Link from 'next/link'
import { style } from '@mui/system';

type Props = {
    id: string
    product: Product
    handleAddToCart: (clickedItem: Product) => void;
}

const ProductCard = ({ id, product, handleAddToCart }: Props) => {
    return (
        <div className={styles.cardContainer} key={id}>
            <div className={styles.card} key={id}>
                <Image
                    src={product.photo}
                    alt="No image to display"
                    width={150}
                    height={150}
                    className={styles.cardImage}
                />
                <div className="flex flex-col gap-2 justify-between items-center">
                    <h2 className={styles.title}>{product.name}</h2>
                    <p className={styles.description}>{product.description}</p>
                    <div className='flex items-center gap-3'>
                        <p className={styles.text}>Tamaño: {product.size}</p>
                        <p className={styles.text}>
                            Precio: ${product.displayPrice}
                        </p>
                    </div>
                </div>
                <button
                    className={styles.button}
                    onClick={() => handleAddToCart(product)}>
                    Agregar al carrito
                </button>
            </div>
        </div>
    )
}

export default ProductCard;
