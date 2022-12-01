import { NextPage } from 'next';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import React from 'react';
import { Product } from 'app/types';
import { MainLayout} from 'components';
import ProductCard  from 'components/products/ProductCard';
import {useQuery} from 'react-query';
import {getProducts} from 'utils/dbFetching'

export type Props = {
    [key: string]: any
}
export type CartItemType = {
    id: string;
    category: string;
    description: string;
    image?: string;
    price: number;
    title?: string;
    amount: number;
}


const Products: NextPage = () => {
    //Recover cartproducts when user comeback from the cart to products again    
    const cartFromLocalStorage = JSON.parse(localStorage.getItem("cartProducts") || '[]')
    const [cartItems, setCartItems] = useState(cartFromLocalStorage as CartItemType[]);

    const {data: products, error, isLoading} = useQuery(['products'], getProducts);
    
    
    const handleAddToCart = (clickedItem: Product) => {
        
        if(!clickedItem.amount) clickedItem.amount=0
        setCartItems(prev => {
          // is the item already added in the cart
          const isItemInCart = prev.find(item => item.id === clickedItem.id); 
          
          if (isItemInCart) {
            return prev.map(item => 
              item.id === clickedItem.id 
              ? { ...item, amount: item.amount + 1 } 
              : item 
            );
          };
          
          // first time the item is added 
          return [...prev, {...clickedItem, amount: 1}];
      
        })        
    };    

    useEffect(() => {
        // storing input cartItems
        localStorage.setItem("cartProducts", JSON.stringify(cartItems));
        
      }, [cartItems]);    

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
            <div className="flex flex-wrap justify-end items-center">
                {isLoading ? <h1>Cargando...</h1>
                    : products.map((product: Product) => 
                            <ProductCard
                                id={product.id}                             
                                product={product}
                                handleAddToCart={handleAddToCart}
                            />
                        
                    )}
            </div>
        </MainLayout>
    )
}

export default Products;
