import { Product } from "app/types";
import styles from 'styles/ShoppingCart.module.css'
import Image from 'next/image'

type Props = {
  product: Product;
  addToCart: (clickedProduct: Product) => void;
  removeFromCart: (id: string) => void;
};

const CartProduct = ({ product, addToCart, removeFromCart }: Props) => {
    
  return (
    <div className='grid grid-cols-6 items-center text-center'>
        <div>
        <Image
                    src={product.photo}
                    alt="No image to display"
                    width='60%'
                    height='50%'
                />
        </div>
        <p>{product.name}</p>        
        <p>${product.price}</p>
        <p>{product.amount}</p>
        
        <div className="w-auto text-md flex justify-center flex-col lg:flex-row">
            <button className="w-auto h-auto bg-transparent border border-black rounded-md py-0 px-1 lg:mr-2"        
            onClick={() => removeFromCart(product.id)}
            >
            -
            </button>            
            <button className="w-auto h-auto bg-transparent border border-black rounded-md py-0 px-1"
            disabled={product.stock<=1 && true}    
            onClick={() => addToCart(product)}
            >
            +
            </button>
        </div>
            <p>${(product.amount! * product.price)}</p>
      
    </div>
  );
};

export default CartProduct;
