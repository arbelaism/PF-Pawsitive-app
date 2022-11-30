import { NextPage} from 'next';
import {useQuery} from 'react-query';
import { useState} from 'react';


const Cart : NextPage = () => {

    if (typeof window !== 'undefined') {
        console.log('You are on the browser')
        // 👉️ can use localStorage here
      } else {
        console.log('You are on the server')
        // 👉️ can't use localStorage
      }
    const [cartProducts, setCartProducts] = useState(()=>{
        const saved = localStorage.getItem("cartProducts")
        const products = JSON.parse(saved!);
        return products;
    })

    console.log(cartProducts)

    return (
      <div>
        <p>Hola</p>
      </div>
    );
  };

export default Cart;