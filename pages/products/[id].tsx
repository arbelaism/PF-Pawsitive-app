import { NextPage } from 'next'
import { Product } from "app/types";
import { MainLayout } from 'components'
import Link from 'next/link';
import ProductDetailComp  from 'components/products/ProductDetail'
import ProductReviews from 'components/products/ProductReviews'
import { useQuery } from 'react-query'
import { getProductById, getTransactionByUserId } from 'utils/dbFetching'
import { useRouter } from 'next/router'
import { useState, useEffect} from 'react';
import useLocalStorage from 'use-local-storage';
import { alerts } from 'utils/alerts';
import { Review } from '@prisma/client';
import { useUser } from "@auth0/nextjs-auth0/client";
import ProductReviewForm from 'components/products/ProductReviewForm';

export type Props = {
    [key: string]: any
}

const ProductDetail: NextPage = () => { 
    //get the idProduct from url
    const router = useRouter()   
    const { id } = router.query
    //Search product in db by id
    const {
        data: product,
        error,
        isLoading, 
        isSuccess,        
    } = useQuery(['product'], () => getProductById(String(id)))
    //State to add product to shoppingCart
    const [cartProduct, setCartProduct] = useState<Product>(Object)
    //Read products stored in localStorage
    const [products, setProducts] = useLocalStorage<Product[]>("cartProducts", [])    
    //search data to compare logged user
    //get user to confirm if he is already logged
    const { user, error: errorU, isLoading: isLoadingU } = useUser()
    const {
        data: transaction,
        error: errorT,
        isLoading: isLoadingT, 
        isSuccess : isSuccessT,        
    } = useQuery(['transaction'], () => getTransactionByUserId(String(user?.sub)))
    //get quantity array from transaction
    const quantities = transaction?.map((transaction:any)=>transaction.quantity)
    //get quantities objects inside quantity array
    const quantityObj = quantities?.find((quantity:any)=>true)
    //search if product.id exist in user transactions quantities
    const userBoughtProduct = quantityObj?.find((quantity:any)=> quantity.product?.id===product?.id)
    //search if user already made a review
    const userAlreadyReview = product?.review?.find((review : Review) => review.userId === user?.sub)
    

    const handleAddToCart = (clickedItem: Product) => {
        if(!user){
            router.push('/api/auth/login')
        }
        else{

            const button = document.getElementById(`buttonCart${clickedItem.id}`) as HTMLButtonElement
            button.classList.add('clicked')
            if(!clickedItem.amount) clickedItem.amount=0
            setCartProduct(() => {
              // is the item already added in the cart       
              
              if (cartProduct.id === clickedItem.id) {
                return { ...cartProduct, amount: cartProduct.amount! + 1, stock: cartProduct.stock-1}
              };
              
              // first time the item is added 
              return {...clickedItem, amount: 1, stock: clickedItem.stock-1};
          
            })
            setTimeout(() => {
                button.classList.remove('clicked')
            }, 2300)     
        }
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
                                <div>
                                    {(userBoughtProduct && !userAlreadyReview) ?(
                                    <ProductReviewForm
                                    id ={product.id}/>
                                    ): userAlreadyReview ? (
                                        <div className='flex justify-content-center w-auto mx-5 rounded-lg px-1 py-1 border-2 border-pwpurple-700'>
                                        <p
                                            className='text-center col-start-2 col-span-4'
                                            >Sabemos que adquiriste nuestro producto y agradecemos que dejaras tu reseña,
                                            si deseas agregar alguna otra sugerencia o comentario, te invitamos contactarte con
                                                nosotros haciendo <b className='text-pwpurple-700'><Link href='/contact'>click aqui</Link></b>
                                            </p>
                                        </div>
                                    ): null
                                    }
                                </div>
                                <div className='flex flex-wrap flex-col justify-between items-start m-5 bg-pwgreen-100 w-full h-auto'>
                                {product.review ? (product.review.map((review : Review)=>
                                        <ProductReviews
                                            key={review.id}
                                            id={review.id}
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