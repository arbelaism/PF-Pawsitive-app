import { NextPage} from 'next';
import { Product } from 'app/types';
import { useState, useEffect} from 'react';
import { MainLayout} from 'components';
import ModalPayment from 'components/products/payments/ModalPayment';
import ProductOnCart from 'components/products/ProductOnCart'
import useLocalStorage from 'use-local-storage';
import Image from 'next/image';
import EmptyCart from "public/xempty-cart.png"


const Cart : NextPage = () => {
    // let products : Product[] = [];
    const [cartProducts, setCartProducts] = useState<Product[]>([])
    const [products, setProducts] = useLocalStorage<Product[]>("cartProducts", [])
    // if (typeof window !== 'undefined') {
        //     var [cartProducts, setCartProducts] = useState<Product[]>(() => {
            //         const saved = localStorage.getItem("cartProducts")
            //         const products = JSON.parse(saved!);
            //         return products
            //     })
            
    //}
    // const setLocalStorageAtComponentMount = () => {
    //     setCartProducts(() => {
    //         // const saved = localStorage.getItem("cartProducts")
    //         // const products = JSON.parse(saved!);

    //         return products
    //     })
    // }
    const handleAddToCart = (clickedItem: Product) => {
        
        if(!clickedItem.amount) clickedItem.amount=0
        setCartProducts(prev => {
          // is the item already added in the cart
          const isItemInCart = prev.find(item => item.id === clickedItem.id); 
          
          if (isItemInCart) {
            return prev?.map(item => 
              item.id === clickedItem.id 
              ? { ...item, amount: item.amount! + 1, stock: item.stock-1 } 
              : item 
            );
          };
          
          // first time the item is added 
          return [...prev, {...clickedItem, amount: 1, stock: clickedItem.stock-1}];
      
        })        
    };
    const handleRemoveFromCart = (id: string) => {
        setCartProducts(prev => 
        prev.reduce((acc, item) => {
        if (item.id === id) {
            if (item.amount === 1) return acc;
            return [...acc, {...item, amount: item.amount! - 1, stock: item.stock + 1}]
        } else {
            return [...acc, item]; 
        }
        },  [] as Product[])
    )
    };
    const getTotalPrice = () => {
        return cartProducts.reduce(
          (acc, product) => acc + product.amount! * product.price,
          0
        );
    };

    useEffect(() => {
        setCartProducts(products)
    }, [])
    
    useEffect(() => {
        // storing input cartProducts
        if(cartProducts.length){            
            setProducts(cartProducts)
        }
        else{
            setProducts([])
        }
        
    }, [cartProducts]);

    const priceToPay = getTotalPrice();  
    
    return (
        <MainLayout title="Pawsitive - Carrito">
            <div className='flex items-center flex-col  p-auto mt-8 h-screen rounded-xl'>
                <h1 className="text-3xl font-bold">Carrito de compras</h1>
                <br />
                <div className='w-full p-4 text-center'>
                    {cartProducts.length === 0 ? (
                        <Image
                            src={EmptyCart}
                            alt="not found"
                        />
                    ) : (
                        <div className="grid grid-flow-row items-center text-center rounded-xl border-2 border-black">
                            <div className='grid grid-cols-6 mt-4 justify-between'>
                                <div className='flex-auto text-center text-sm lg:text-lg font-bold pb-2 uppercase border-b-2 border-black mb-2'>Imagen</div>
                                <div className='flex-auto text-center text-sm lg:text-lg font-bold pb-2 uppercase border-b-2 border-black mb-2'>Producto</div>
                                <div className='flex-auto text-center text-sm lg:text-lg font-bold pb-2 uppercase border-b-2 border-black mb-2'>Precio unitario</div>
                                <div className='flex-auto text-center text-sm lg:text-lg font-bold pb-2 uppercase border-b-2 border-black mb-2'>Cantidad</div>
                                <div className='flex-auto text-center text-sm lg:text-lg font-bold pb-2 uppercase border-b-2 border-black mb-2'>Agregar/Remover</div>
                                <div className='flex-auto text-center text-sm lg:text-lg font-bold pb-2 uppercase border-b-2 border-black mb-2'>Precio total producto</div>
                            </div>
                            {cartProducts.map((product: Product) => (
                                <ProductOnCart
                                    key={product.id}
                                    product={product}
                                    addToCart={handleAddToCart}
                                    removeFromCart={handleRemoveFromCart}
                                />
                            ))}
                        </div>
                    )}
                    <hr />
                    <div className='flex justify-between text-sm font-bold border-2 border-black w-auto px-8'>
                        <h3 className='text-md lg:text-lg'>Total compra: $ </h3>
                        <h3 className='text-md lg:text-lg'>{getTotalPrice()}</h3>
                    </div>
                    <ModalPayment price={priceToPay} />                                            
                </div>
            </div>
        </MainLayout>
    )
};

export default Cart;
