import { NextPage } from 'next';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import React from 'react';
import { Product } from 'app/types';
import { MainLayout, Filtersproducts } from 'components';
import ProductCard from 'components/products/ProductCard';
import { useQuery } from 'react-query';
import { getProducts } from 'utils/dbFetching';
import AlternativePagination from 'components/layout/AlternativePagination'

export type Props = {
    [key: string]: any
}



const Products: NextPage = () => {

    //pagination anda data for filter
    const { data: products, error, isLoading, isSuccess } = useQuery(['products'], getProducts);
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [itemsPerPage, _setItemsPerPage] = useState<number>(6)
    const [data, setData] = useState<Product[]>()

    const lastItemIndex = currentPage * itemsPerPage
    const firstItemIndex = lastItemIndex - itemsPerPage
    let currentItems: Product[] = []
    if (data) currentItems = [...data.slice(firstItemIndex, lastItemIndex)]

    useEffect(() => {

  
            setData(products)
     

    }, [products]

    )

    //Recover cartproducts when user comeback from the cart to products again   
    let cartFromLocalStorage;
    try {
        cartFromLocalStorage = JSON.parse(localStorage.getItem("cartProducts") || '[]')
    } catch (error) {
        console.log(error)
    }

    const handleAddToCart = (clickedItem: Product) => {

        if (!clickedItem.amount) clickedItem.amount = 0
        setCartItems(prev => {
            // is the item already added in the cart
            const isItemInCart = prev.find(item => item.id === clickedItem.id);

            if (isItemInCart) {
                return prev.map(item =>
                    item.id === clickedItem.id
                        ? { ...item, amount: item.amount! + 1 }
                        : item
                );
            };

            // first time the item is added 
            return [...prev, { ...clickedItem, amount: 1 }];

        })
    };





    // Recover cartproducts when user comeback from the cart to products again  

    const [cartItems, setCartItems] = useState(cartFromLocalStorage as Product[]);


    useEffect(() => {
        // storing input cartItems
        localStorage.setItem("cartProducts", JSON.stringify(cartItems));

    }, [cartItems, products]);


    return (
        <MainLayout title="Pawsitive - Productos">
            <div className="px-4 py-2 w-full flex justify-between items-center">
                <h1 className="text-3xl font-bold">Productos</h1>
            </div>
            <div className='flex flex-wrap justify-end items-center'>
                <Link href={'/shoppingCart'}>
                    <a>Ir al carrito</a>
                </Link>
            </div>
            <div className="flex">
                <div className="w-64">
                    <Filtersproducts
                        setData={setData}

                        setCurrentPage={setCurrentPage}
                    />
                </div>
                <div className="flex grow flex-col justify-center items-center">
                    {!isLoading && currentItems ? (
                        <AlternativePagination
                            totalItems={(data ? data : products)?.length}
                            itemsPerPage={itemsPerPage}
                            setCurrentPage={setCurrentPage}
                        />
                    ) : null}
                    <div className="grid grid-cols-3 justify-center items-center">
                        {isLoading ? (
                            <h1>Loading...</h1>
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
                        )
                        }
                    </div>
                </div>

            </div>

        </MainLayout>
    )
}

export default Products;
