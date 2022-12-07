import React from 'react'
import Image from 'next/image'
import { Product } from 'app/types';
import Link from 'next/link'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'

type Props = {
    id: string
    product: Product
    handleAddToCart: (clickedItem: Product) => void;
}

const ProductCard = ({ id, product, handleAddToCart }: Props) => {

    const productR: Number = Math.floor(4.5);
    let stars= [];
    for(let i = 0; i<5; i++){
        if(i<productR) stars.push(true);
        if(i>=productR) stars.push(false);
    }

    return (      
        
<div key={id} >
    <div className="flex flex-col justify-between items-center m-5 bg-white shadow-md rounded-lg w-60 h-80 shadow-xl">
        <div className='h-1/8'>
            <Image className="rounded-t-lg p-8" src={product.photo} alt="product image" width={120} height={120}/>
        </div>          
        <div className="flex flex-col justify-between items-center h-7/8 z-1000">
            <div className='px-5'>
                <h3 className="text-gray-900 font-Rubik">
                    {product.name}
                </h3>
            </div>
            
            <div className="flex items-center mb-2.5">
                {stars.map((star, idx)=>{
                    if(star===true){
                        return <AiFillStar key={idx}/>
                    } 
                    if(star===false){
                        return <AiOutlineStar key={idx}/>
                    } 
                })}
            </div>
            <div className='flex flex-row justify-center items-center mb-1 mt-1 font-Rubik'>
                <div className='px-2.5'>
                    <span className="text-lg text-pwpurple-700">
                        ${product.displayPrice}
                    </span>
                </div>
                <div className='px-2.5'>
                    <div>
                        <button onClick={() => 
                            handleAddToCart(product)} 
                            disabled = {product.stock<=1 && true} 
                            className="text-l font-bold rounded-lg px-1 py-1 border-2 border-pwpurple-700 text-pwpurple-700 hover:bg-pwpurple-700 hover:text-pwpurple-100 duration-300"
                            >
                            +Carrito
                        </button>
                    </div>
                </div>

            </div>
            <div className='pb-5'>
                <Link href={"/products/"+product.id}>
                    <a className="text-pwgreen-500  text-md font-semibold">
                        Ver detalles
                    </a>
                </Link>
            </div>
        </div>
    </div>

</div>


            
        
    )
}

export default ProductCard;
