import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Product } from 'app/types'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { FaShoppingCart, FaBox } from 'react-icons/fa'

type Props = {
    id: string
    product: Product
    handleAddToCart: (clickedItem: Product) => void
}

const ProductCard = ({ id, product, handleAddToCart }: Props) => {
    const productR: Number = Math.floor(4.5)
    let stars = []
    for (let i = 0; i < 5; i++) {
        if (i < productR) stars.push(true)
        if (i >= productR) stars.push(false)
    }

    return (
        <div className="bg-white py-4 w-full h-44 rounded-md group shadow-md flex items-center justify-between text-pwgreen-800 lg:w-60 lg:h-80 lg:flex-col overflow-hidden lg:py-8 hover:shadow-2xl hover:h-48 lg:hover:h-[23rem] transition-all">
            <div className="w-1/2 ">
                <Image
                    src={product.photo}
                    alt="Room Image"
                    width={200}
                    height={200}
                />
            </div>

            <div className="w-full flex flex-col justify-between h-full">
                <div className="p-2 h-3/4 flex flex-col justify-evenly gap-2">
                    <div className="lg:h-2/3">
                        <h3 className="font-Rubik font-medium text-pwgreen-900 pt-2 mx-2 lg:truncate group-hover:whitespace-pre-wrap">
                            {product.name}
                        </h3>
                    </div>
                    <div className="self-start text-lg mx-1 my-1 hidden group-hover:flex text-pwpurple-800">
                        {stars.map((star, idx) => {
                            if (star === true) {
                                return <AiFillStar key={idx} />
                            }
                            if (star === false) {
                                return <AiOutlineStar key={idx} />
                            }
                        })}
                    </div>
                    <div className="flex justify-between items-center h-1/3 mx-1">
                        <span className="text-2xl font-semibold text-pwpurple-500">
                            ${product.displayPrice}
                        </span>
                        <div className="px-2.5">
                            <button
                                onClick={() => handleAddToCart(product)}
                                disabled={product.stock <= 1 && true}
                                className="cart-button"
                                id={'buttonCart' + product.id}>
                                <span className="add-to-cart">+Carrito</span>
                                <span className="added">Agregado</span>
                                <span className="fa-shopping-cart">
                                    <FaShoppingCart />
                                </span>
                                <span className="fa-box">
                                    <FaBox />
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mx-3 mt-1 self-end">
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

export default ProductCard
