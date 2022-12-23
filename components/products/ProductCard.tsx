import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Product } from 'app/types'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { FaShoppingCart, FaBox, FaHeart, FaRegHeart } from 'react-icons/fa'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { createBookmark, deleteBookmark, getBookmarks } from 'utils/dbFetching'
import { useUser } from '@auth0/nextjs-auth0/client'

type Props = {
    id: string
    product: Product
    handleAddToCart: (clickedItem: Product) => void
}

const ProductCard = ({ id, product, handleAddToCart }: Props) => {
    const [isBookmark, setIsBookmark] = useState(false)

    const { user, error: errorU, isLoading: isLoadingU } = useUser()

    let userId: string = ''
    if (!isLoadingU && user && user.sub) {
        userId = user.sub
    }

    const queryClient = useQueryClient()

    const {
        data: bookmarks,
        isLoading: isBookmarksLoading,
        isSuccess: isBookmarksSuccess,
        refetch
    } = useQuery(['bookmarks', userId], () => getBookmarks(userId))

    const mutationCreate = useMutation(
        ({ id, productId }: any) => createBookmark(id, productId),
        {
            onSuccess: () => {
                queryClient.refetchQueries()
            }
        }
    )

    const mutationDelete = useMutation(
        ({ id, productId }: any) => deleteBookmark(id, productId),
        {
            onSuccess: () => {
                queryClient.refetchQueries()
            }
        }
    )

    const productR: Number = Math.floor(4.5)
    let stars = []
    for (let i = 0; i < 5; i++) {
        if (i < productR) stars.push(true)
        if (i >= productR) stars.push(false)
    }

    const handleBookmark = (e: React.MouseEvent<HTMLButtonElement>) => {
        const productId = e.currentTarget.name

        if (!isBookmark) {
            mutationCreate.mutate({ id: userId, productId })
        } else {
            mutationDelete.mutate({ id: userId, productId })
        }
    }

    useEffect(() => {
        if (!isBookmarksLoading && isBookmarksSuccess) {
            const { product } = bookmarks

            if (product) {
                const result = product.find((p: any) => p.id === id)

                result ? setIsBookmark(true) : setIsBookmark(false)

                return
            }
        }

        refetch()
    }, [bookmarks, id])

    return (
        <div className="bg-white py-4 w-full h-44 rounded-md group shadow-md relative flex items-center justify-between text-pwgreen-800 lg:w-60 lg:h-80 lg:flex-col overflow-hidden lg:py-8 hover:shadow-2xl hover:h-48 lg:hover:h-[25rem] transition-all">
            <div className="w-1/2 ">
                <Image
                    src={product.photo}
                    alt="Room Image"
                    width={200}
                    height={200}
                />
            </div>
            <div className="absolute right-5 top-4 text-2xl">
                {isBookmark ? (
                    <button name={product.id} onClick={handleBookmark}>
                        <FaHeart className="text-red-500 group-hover:block opacity-100 hover:opacity-80 hover:text-red-300 transition-all" />
                    </button>
                ) : (
                    <button name={product.id} onClick={handleBookmark}>
                        <FaRegHeart className="text-red-300 opacity-70 hover:opacity-100 hover:text-red-500 transition-all" />
                    </button>
                )}
            </div>

            <div className="w-full flex flex-col justify-around h-full">
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
                                <span className="add-to-cart font-semibold flex items-center justify-center">
                                    +
                                    <FaShoppingCart />
                                </span>
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
                <div className="absolute bottom-4 right-5">
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
