import { Product } from "app/types";
import Image from 'next/image'
import styles from 'styles/ProductDetail.module.css'

type Props = {
    product: Product;
    addToCart: (clickedProduct: Product) => void;    
  };
  
  const ProductDetailComp = ({ product, addToCart }: Props) => {
    
    return(
        <div className={styles.container}>
            <div className={styles.imgContainer}>
                <Image
                    src={product.photo}
                    alt="No image to display"
                    width={400}
                    height={370}                
                />
            </div>
            <div className={styles.detailContainer}>
                <h2 className={styles.title}>{product.name}</h2>
                <p className={styles.description}>{product.description}</p>   
                <p>Precio: ${product.price}</p>
                <p>Unidades disponibles: {product.stock}</p>
                     
                
                <div>                    
                    <button
                    className={styles.button}
                    hidden={product.stock<=1 && true}    
                    onClick={() => addToCart(product)}
                    >
                    Agregar al carrito
                    </button>
                    {product.stock<=1 && (<p>Producto agotado</p>)}
                </div>
            </div>
        </div>
    )
  }

  export default ProductDetailComp