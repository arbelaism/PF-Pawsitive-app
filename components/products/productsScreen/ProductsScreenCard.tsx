import React from 'react'
import Image from 'next/image'
import { Product, UserProduct } from 'app/types';
import styles from 'styles/ProductCard.module.css'
import Link from 'next/link'

type Props = {
    id: string
    product: Product
}

const ProductsScreenCard = ({ id, product }: Props) => {

    return(

    <div className="bg-white py-5 w-250 h-60 rounded shadow-xl flex card text-grey-darkest my-10">
            <div className="w-1/2 h-full rounded-l-sm">
                <Image  src={product.photo} alt="Room Image" width={200} height={200}/> 
            </div>
            
            <div className="w-full flex flex-col ">
                <h3 className="font-Rubik text-grey-darkest h-1/4 pt-1 pr-5">
                    {product.name}
                </h3>
                <div className="p-2 pb-0 flex flex-col justify-end items-start h-3/4 pt-1">
                    <div>
                        <span className="text-2xl text-pwpurple-500">
                            ${product.displayPrice}
                        </span>
                        <h4 className="text-grey-darker">
                            Tamaño: {product.size}
                        </h4>
                    </div>
                    <div className="bg-grey-lighter p-3 flex items-center justify-between transition hover:bg-grey-light">
                        <Link href="/products/:id">
                            <a className="text-pwgreen-500  text-md font-semibold">
                                Ver detalles
                            </a>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ProductsScreenCard;