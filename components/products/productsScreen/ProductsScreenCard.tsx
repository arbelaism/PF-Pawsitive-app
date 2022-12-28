import React from 'react'
import Image from 'next/image'
import { Product } from 'app/types'
import Link from 'next/link'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'

type Props = {
    id: string
    product: Product
}

const ProductsScreenCard = ({ id, product }: Props) => {
    const productR: Number = Math.floor(4.5)
    let stars = []
    for (let i = 0; i < 5; i++) {
        if (i < productR) stars.push(true)
        if (i >= productR) stars.push(false)
    }

    return (
        <div className="bg-white py-5 w-full h-60 lg:h-80 rounded-md shadow-md flex items-center justify-between text-pwgreen-800 my-14 lg:flex-col overflow-hidden lg:py-8 z-50 hover:shadow-2xl transition-all">
            <div className="w-1/2 m-2">
                <Image
                    src={product.photo}
                    alt="Room Image"
                    width={200}
                    height={200}
                />
            </div>

            <div className="w-full flex flex-col justify-between h-1/2">
                <div className="p-2 h-3/4 flex flex-col justify-evenly gap-1">
                    <div>
                        <span className="text-2xl font-semibold text-pwpurple-500 mx-1">
                            ${product.displayPrice}
                        </span>
                    </div>
                    <div className="flex self-start ml-1 text-pwpurple-800">
                        {stars.map((star, idx) => {
                            if (star === true) {
                                return <AiFillStar key={idx} />
                            }
                            if (star === false) {
                                return <AiOutlineStar key={idx} />
                            }
                        })}
                    </div>
                    <h3 className="font-Rubik text-slate-500 text-xs lg:px-2">
                        {product.name}
                    </h3>
                </div>
                <div className="p-3 h-1/4 lg:self-end">
                    <Link href={`/products/${id}`}>
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
