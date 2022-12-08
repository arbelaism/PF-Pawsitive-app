import { NextPage } from 'next'
import { Product } from "app/types";
import { MainLayout } from 'components'
import ProductDetailComp  from 'components/products/ProductDetail'
import ProductReviews from 'components/products/ProductReviews'
import { useQuery } from 'react-query'
import { getProductById, getProductsByCategory } from 'utils/dbFetching'
import { useRouter } from 'next/router'
import { useState, useEffect} from 'react';
import useLocalStorage from 'use-local-storage';
import { alerts } from 'utils/alerts';
import { Review } from '@prisma/client';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'

export type Props = {
    [key: string]: any
}

const ProductDetail: NextPage = () => { 
    
    const router = useRouter()   
    const { id } = router.query
    const {
        data: product,
        error,
        isLoading, 
        isSuccess,        
    } = useQuery(['product'], () => getProductById(String(id)))
    
    const [cartProduct, setCartProduct] = useState<Product>(Object)
    const [products, setProducts] = useLocalStorage<Product[]>("cartProducts", [])    

    const handleAddToCart = (clickedItem: Product) => {
        alerts({
            icon: 'success',
            title: '<strong>Producto agregado con exito</strong>',
            html: 'Para ir al carrito presione <b><a href="/shoppingCart">aqui</a></b>, ' +
            'para seguir comprando presione el boton "Continuar"',
            confirmButtonText: 'Continuar',
            confirmButtonAriaLabel:  'Thumbs up, great!',
        })
        if(!clickedItem.amount) clickedItem.amount=0
        setCartProduct(() => {
          // is the item already added in the cart       
          
          if (cartProduct.id === clickedItem.id) {
            return { ...cartProduct, amount: cartProduct.amount! + 1, stock: cartProduct.stock-1}
          };
          
          // first time the item is added 
          return {...clickedItem, amount: 1, stock: clickedItem.stock-1};
      
        })        
    };    
    useEffect(() => {
        // storing input cartProducts
        if(cartProduct.hasOwnProperty('id')){             
            setProducts(() => {
            const isItemInCart = products.find(prod => prod.id === cartProduct.id)
            if(isItemInCart){
                return (products.map(prod =>
                    prod.id === cartProduct.id
                    ? {... prod, amount : cartProduct.amount!, stock : cartProduct.stock}
                    : prod
                ))
            }
            return [...products, {...cartProduct}]
                    
            } )         
            
        }
        else if(products.length){
            setProducts([...products])
        }
        else{
            setProducts([])
        }        
    }, [cartProduct]);    
    return(
        <MainLayout title="Pawsitive - Productos">

                    <div className="flex flex-wrap justify-center items-center">
                        {isLoading ? (
                            <h1>Loading...</h1>
                        ) : error ? (
                            <p>Not found</p>
                        ) : <div className='bg-pwgreen-100'>
                                <ProductDetailComp
                                    product = {product}
                                    addToCart = {handleAddToCart}                            
                                />
                                <div className='flex flex-wrap flex-col justify-between items-start m-5 bg-pwgreen-100 w-full h-auto'>
                                {product.review ? (product.review.map((review : Review)=>
                                        <ProductReviews
                                            review={review}
                                        />
                                        ))
                                        :null}
                                </div>
                            </div>                                
                        }                        
                    </div>
        </MainLayout>
    )
}

export default ProductDetail;