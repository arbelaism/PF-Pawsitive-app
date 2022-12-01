import { Product } from "app/types";
import styles from 'styles/ShoppingCart.module.css'

type Props = {
  product: Product;
  addToCart: (clickedproduct: Product) => void;
  removeFromCart: (id: string) => void;
};

const CartProduct = ({ product, addToCart, removeFromCart }: Props) => {
    
  return (
    <div className={styles.body}>
        <div className={styles.image}>
            <img className={styles.image} src={product.photo} height="90" width="65" />
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
