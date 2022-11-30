import { Product } from "app/types";

type Props = {
  product: Product;
  addToCart: (clickedproduct: Product) => void;
  removeFromCart: (id: string) => void;
};

const CartProduct = ({ product, addToCart, removeFromCart }: Props) => {
  return (
    <div>
      <h3>{product.name}</h3>
      <div className={"information"}>
        <p>Price: ${product.price}</p>
        <p>Total: ${(product.amount! * product.price).toFixed(2)}</p>
      </div>
      <div className="buttons">
        <button          
          onClick={() => removeFromCart(product.id)}
        >
          -
        </button>
        <p>{product.amount}</p>
        <button          
          onClick={() => addToCart(product)}
        >
          +
        </button>
      </div>
      <img src={product.photo} alt={product.name} />
    </div>
  );
};

export default CartProduct;
