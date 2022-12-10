import { Review } from "app/types";
import { Product } from "app/types";
import Image from 'next/image'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { FaShoppingCart, FaBox } from "react-icons/fa";

type Props = {
    product: Product;
    addToCart: (clickedProduct: Product) => void;    
  };
  
  const ProductDetailComp = ({ product, addToCart }: Props) => {
    let ratings : number[] = []
    let sumRating = 0
    let generalRating = 0
    let stars= [];
    if(product.review.length){

        ratings = product.review.map((review : Review) => review.rating)    
        sumRating = ratings.reduce((acc, rating, i) =>acc+rating)    
        generalRating = sumRating/(ratings.length)
        for(let i = 0; i<5; i++){
            if(i<Math.round(generalRating)) stars.push(true);
            if(i>=Math.round(generalRating)) stars.push(false);
        }
    }
    else{
        for(let i = 0; i<5; i++){            
            stars.push(false);
        }
    }
    
    
    

    
    return(
        <div key={product.id} className='flex items-center flex-row-reverse justify-between rounded-xl mt-5 p-2 right-0 bg-pwgreen-300'>
            <div className="rounded-t-lg p-8">
                <Image
                    src={product.photo}
                    className="rounded-t-lg p-8"
                    alt="No image to display"
                    width={350}
                    height={320}                
                />
            </div>
            <div className='flex items-start flex-col justify-between h-auto w-3/4 mr-4 px-1'>
                <h2 className='text-2xl font-semibold w-full h-20 overflow-hidden'>{product.name}</h2>
                <p className='text-justify'>{product.description}</p>   
                <p>Precio: ${product.price}</p>
                <p>Unidades disponibles: {product.stock}</p>
                     
                <div className="flex items-center mb-2.5">
                    {stars.map((star, idx)=>{
                        if(star===true){
                            return <AiFillStar key={idx}/>
                        } 
                        if(star===false){
                            return <AiOutlineStar key={idx}/>
                        } 
                    })}
                    <p>{"("+ratings.length+")"}</p>
                </div>
                <div className='px-1'>
                    <div>
                        <button
                            onClick={() => addToCart(product)}
                            disabled={product.stock <= 1 && true}
                            className="cart-button"
                            id={'buttonCart' + product.id}>
                            <span className="add-to-cart">
                                +Carrito
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
        </div>
    )
  }

  export default ProductDetailComp