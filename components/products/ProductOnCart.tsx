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
    <div className={styles.body}>
        <div className={styles.image}>
        <Image
                    src={product.photo}
                    alt="No image to display"
                    width={90}
                    height={65}
                    className={styles.cardImage}
                />
        </div>
        <p>{product.name}</p>        
        <p>${product.price}</p>
        <p>{product.amount}</p>
        
        <div className={styles.buttons}>
            <button          
            onClick={() => removeFromCart(product.id)}
            >
            -
            </button>            
            <button          
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
