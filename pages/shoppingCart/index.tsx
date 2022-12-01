import { NextPage} from 'next';
import { Product } from 'app/types';
import { useState} from 'react';
import { MainLayout} from 'components';
import ProductOnCart from 'components/products/ProductOnCart'
import styles from 'styles/ShoppingCart.module.css'


const Cart : NextPage = () => {
    
    if (typeof window !== 'undefined') {
        var [cartProducts, setCartProducts] = useState<Product[]>(()=>{
            const saved = localStorage.getItem("cartProducts")
            const products = JSON.parse(saved!);
            return products;
        })
    }
    const handleAddToCart = (clickedItem: Product) => {
        
        if(!clickedItem.amount) clickedItem.amount=0
        setCartProducts(prev => {
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
          return [...prev, {...clickedItem, amount: 1}];
      
        })        
    };
    const handleRemoveFromCart = (id: string) => {
        setCartProducts(prev => 
        prev.reduce((acc, item) => {
        if (item.id === id) {
            if (item.amount === 1) return acc;
            return [...acc, {...item, amount: item.amount! - 1}]
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
    
    return (
        
        <MainLayout title="Pawsitive - Carrito">
            <div className="px-4 py-2 w-full flex justify-between items-center">
                <h1 className="text-3xl font-bold">Carrito de compras</h1><br/>             
                <div className={styles.container}>
                    {!cartProducts.length ? 
                        <h1>Your Cart is Empty!</h1>
                     : 
                        <div className='body'>
                            <div className={styles.header}>
                                <div>Image</div>
                                <div>Product</div>
                                <div>Price</div>
                                <div>Quantity</div>
                                <div>Actions</div>
                                <div>Total Price</div>
                            </div>
                            {cartProducts.map((product : Product)=>
                            <ProductOnCart
                            product={product}
                            addToCart={handleAddToCart}
                            removeFromCart={handleRemoveFromCart}
                            /> 
                        )}

                            <h2>Total compra: $ {getTotalPrice()}</h2>
                        </div>

                                                   
                                        
                    }
                </div>                
            </div>
        </MainLayout>
    );
};

export default Cart;