import React, { useMemo, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { getProducts } from 'utils/dbFetching'
import Image from 'next/image'
import Loading from 'public/loading.gif'
import { Product } from '@prisma/client'
import Link from 'next/link'

type Props = {
    category: string
}

const ProductsPromotion = ({ category }: Props) => {
    const [data, setData] = useState<Product[]>()
    const { data: products, isLoading } = useQuery(['products'], getProducts)

    let productsFiltered: Product[] = useMemo(() => {
        if (!isLoading && products) {
            return (productsFiltered = products.filter(
                (p: Product) => p.category === category
            ))
        }
    }, [category, products])

    useEffect(() => {
        setData(productsFiltered)
    }, [productsFiltered])

    return (
        <div className="w-max absolute right-0 2xl:right-5 inset-y-0 px-3 py-6 my-9 bg-pwgreen-100 overflow-y-scroll">
            {isLoading ? (
                <div className="flex justify-center items-center my-16">
                    <Image
                        src={Loading}
                        alt="not found"
                        width={100}
                        height={100}
                    />
                </div>
            ) : (
                <>
                    <div className="flex flex-col gap-4">
                        {data &&
                            data.map(product => {
                                return (
                                    <div
                                        className="flex justify-between items-center py-4 w-80 2xl:w-96 h-32 px-4 bg-white rounded-xl shadow-md"
                                        key={product.id}>
                                        <div className="flex flex-col">
                                            <h3 className="text-sm text-slate-500">
                                                {product.name}
                                            </h3>
                                            <p className="text-lg font-semibold text-pwpurple-700">
                                                ${product.displayPrice}
                                            </p>
                                        </div>
                                        <div className='flex flex-col items-center justify-between'>
                                            <Image
                                                src={product.photo}
                                                alt={'not found'}
                                                objectFit={'cover'}
                                                width={64}
                                                height={64}
                                            />
                                            <Link
                                                href={`/products/${product.id}`}>
                                                <a className='text-xs font-medium w-full hover:text-pwgreen-800 transition-all'>Ver mas</a>
                                            </Link>
                                        </div>
                                    </div>
                                )
                            })}
                    </div>
                </>
            )}
        </div>
    )
}

export default ProductsPromotion
