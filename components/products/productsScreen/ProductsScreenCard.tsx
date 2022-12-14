import React from 'react'
import Image from 'next/image'
import { Product, UserProduct } from 'app/types'
import Link from 'next/link'

type Props = {
    id: string
    product: Product
}

const ProductsScreenCard = ({ id, product }: Props) => {
    return (
        <div className="bg-white py-5 w-full h-80 rounded-md shadow-md flex items-center justify-between text-pwgreen-800 my-14 lg:flex-col overflow-hidden lg:py-8 z-50 hover:shadow-2xl transition-all">
            <div className="w-1/2 m-2">
                <Image
                    src={product.photo}
                    alt="Room Image"
                    width={200}
                    height={200}
                />
            </div>

            <div className="w-full flex flex-col justify-between items-center h-1/2">
                <div className="p-2 h-3/4 flex flex-col justify-evenly items-start gap-1">
                    <div>
                        <span className="text-2xl font-semibold text-pwpurple-500 mx-1">
                            ${product.displayPrice}
                        </span>
                    </div>
                    <h3 className="font-Rubik text-slate-500 text-xs px-2">
                        {product.name}
                    </h3>
                </div>
                <div className="p-3 h-1/4 self-end">
                    <Link href="/products/:id">
                        <a className="text-pwgreen-600 text-md font-semibold hover:text-pwgreen-800 transition-colors">
                            Ver detalles
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ProductsScreenCard
