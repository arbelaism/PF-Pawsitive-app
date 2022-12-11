import { NextPage } from 'next'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import React from 'react'
import { Product } from 'app/types'
import { MainLayout, Filtersproducts } from 'components'
import ProductCard from 'components/products/ProductCard'
import { useQuery } from 'react-query'
import { getProducts } from 'utils/dbFetching'
import AlternativePagination from 'components/layout/AlternativePagination'
import useLocalStorage from 'use-local-storage'
import NotFound from 'public/mong03b.gif'
import Image from 'next/image'

export type Props = {
    [key: string]: any
}

const Products: NextPage = () => {
    //pagination anda data for filter
    const {
        data: products,
        error,
        isLoading,
        isSuccess
    } = useQuery(['products'], getProducts)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [itemsPerPage, _setItemsPerPage] = useState<number>(6)
    const [data, setData] = useState<Product[]>()

    //Recover cartproducts when user comeback from the cart to products again
    const [cartFromLocalStorage, setCartFromLocalStorage] = useLocalStorage<
        Product[]
    >('cartProducts', [])
    const [cartItems, setCartItems] = useState(
        cartFromLocalStorage as Product[]
    )

    // const [productsFromStorage, setProductsFromStorage] = useLocalStorage<Product[]>("cartProducts", [])

    // Recover cartproducts when user comeback from the cart to products again

    //pagination
    const lastItemIndex = currentPage * itemsPerPage
    const firstItemIndex = lastItemIndex - itemsPerPage
    let currentItems: Product[] = []
    if (data) currentItems = [...data.slice(firstItemIndex, lastItemIndex)]

    const handleAddToCart = (clickedItem: Product) => {
        const button = document.getElementById(`buttonCart${clickedItem.id}`) as HTMLButtonElement
        button.classList.add('clicked')

        if (!clickedItem.amount) clickedItem.amount = 0
        setCartItems(prev => {
            // is the item already added in the cart
            const isItemInCart = prev.find(item => item.id === clickedItem.id)

            if (isItemInCart) {
                return prev.map(item =>
                    item.id === clickedItem.id
                        ? { ...item, amount: item.amount! + 1 }
                        : item
                )
            }

            // first time the item is added
            return [...prev, { ...clickedItem, amount: 1 }]
        })

        setTimeout(() => {
            button.classList.remove('clicked')
        }, 2300)
    }
    useEffect(() => {
        setData(products)
    }, [products])

    useEffect(() => {
        // storing input cartItems
        // localStorage.setItem("cartProducts", JSON.stringify(cartItems));
        setCartFromLocalStorage(cartItems)
    }, [cartItems])

    return (
        <MainLayout title="Pawsitive - Productos">
            <div className="px-4 py-2 w-full flex justify-between items-center bg-transparent">
                <h1 className="text-3xl font-bold p-4 bg-pwpurple-50 rounded-xl border-pwgreen-700 shadow-xl lg:text-5xl">Productos</h1>
            </div>
            <div className="flex">
                <div className="flex grow flex-col justify-center items-center bg-transparent">
                    {!isLoading && currentItems ? (
                        <AlternativePagination
                            totalItems={(data ? data : products)?.length}
                            itemsPerPage={itemsPerPage}
                            setCurrentPage={setCurrentPage}
                        />
                    ) : null}
                    <div className="flex flex-wrap justify-center items-center bg-transparent">
                        {isLoading ? (
                            <h1>Loading...</h1>
                        ) : currentItems.length === 0 ? (
                            <div className="flex flex-col justify-center items-center">
                                <h1 className="font-bold text-3xl">
                                    No encontramos items
                                </h1>
                                <Image
                                    src={NotFound}
                                    alt="not found"
                                    width={500}
                                    height={400}
                                />
                            </div>
                        ) : (
                            currentItems.map((product: any) => {
                                return (
                                    <ProductCard
                                        key={product.id}
                                        id={product.id}
                                        product={product}
                                        handleAddToCart={handleAddToCart}
                                    />
                                )
                            })
                        )}
                    </div>
                </div>
                <div className="w-auto ml-4 fixed left-1 top-[20%] lg:sticky lg:right-10 lg:top-10">
                    <Filtersproducts
                        setData={setData}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
            </div>
        </MainLayout>
    )
}

export default Products
