import { NextPage } from 'next';
// import Link from 'next/link';
import { useState } from 'react';
import React from 'react';
import { Product, UserProduct } from 'app/types';
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
    const [cartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([] as CartItemType[]);

    const {data: products, error, isLoading} = useQuery(['products'], getProducts);
    
    
    const handleAddToCart = (clickedItem: Product) => {
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
      const handleRemoveFromCart = (id: string) => {
        setCartItems(prev => 
          prev.reduce((acc, item) => {
            if (item.id === id) {
              if (item.amount === 1) return acc;
              return [...acc, {...item, amount: item.amount - 1}]
            } else {
              return [...acc, item]; 
            }
          },  [] as CartItemType[])
        )
      };

    return (
        <MainLayout title="Pawsitive - Productos">
            <div className="px-4 py-2 w-full flex justify-between items-center">
                <h1 className="text-3xl font-bold">Productos</h1>                
            </div>

            {/*FILTROS*/}
            {/* FIX: FIX THIS */}
            {/* <Filters adoptions={adoptions} /> */}

            <div className="flex flex-wrap justify-end items-center">
                {isLoading ? <h1>Cargando...</h1>
                    : products.map((product: Product) => {
                        return (
                            <ProductCard                                
                                id={product.id}
                                name={product.name}
                                price={product.displayPrice!}
                                description={product.description}
                                stock={product.stock}
                                category={product.category.toLowerCase()}
                                brand={product.brand}
                                size={product.size.toLowerCase()}
                                user={product.user}
                                photo={product.photo}
                                handleAddToCart={handleAddToCart}
                            />
                        )
                    })}
            </div>
        </MainLayout>
    )
}

export default Products;
