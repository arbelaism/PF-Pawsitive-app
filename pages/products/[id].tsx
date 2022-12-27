import { NextPage } from 'next'
import { Product } from 'app/types'
import { MainLayout } from 'components'
import Link from 'next/link'
import ProductDetailComp from 'components/products/ProductDetail'
import ProductReviews from 'components/products/ProductReviews'
import { useQuery } from 'react-query'
import { getProductById, getTransactionByUserId } from 'utils/dbFetching'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import useLocalStorage from 'use-local-storage'
import { redirectionAlert } from 'utils/alerts'
import { Review } from '@prisma/client'
import { useUser } from '@auth0/nextjs-auth0/client'
import ProductReviewForm from 'components/products/ProductReviewForm'
import Loading from 'public/loading.gif'
import Image from 'next/image'
import { ProductsPromotion } from 'components'

export type Props = {
    [key: string]: any
}

const ProductDetail: NextPage = () => {
    //get the idProduct from url
    const router = useRouter()
    const { id } = router.query
    //Search product in db by id
    let {
        data: product,
        error,
        isLoading,
        isSuccess,
        refetch
    } = useQuery(['product'], () => getProductById(String(id)))
    //State to add product to shoppingCart
    const [cartProduct, setCartProduct] = useState<Product>(Object)
    //Read products stored in localStorage
    const [products, setProducts] = useLocalStorage<Product[]>(
        'cartProducts',
        []
    )
    //search data to compare logged user
    //get user to confirm if he is already logged
    const { user, error: errorU, isLoading: isLoadingU } = useUser()
    const {
        data: transaction,
        error: errorT,
        isLoading: isLoadingT,
        isSuccess: isSuccessT
    } = useQuery(['transaction'], () =>
        getTransactionByUserId(String(user?.sub))
    )
    //get quantity array from transaction
    const quantities = transaction?.map(
        (transaction: any) => transaction.quantity
    )
    //get quantities objects inside quantity array
    const quantityObj = quantities?.find((quantity: any) => true)
    //search if product.id exist in user transactions quantities
    const userBoughtProduct = quantityObj?.find(
        (quantity: any) => quantity.product?.id === product?.id
    )
    //search if user already made a review
    const userAlreadyReview = product?.review?.find(
        (review: Review) => review.userId === user?.sub
    )

    const handleAddToCart = (clickedItem: Product) => {
        if (!user) {
            // router.push('/api/auth/login')
            redirectionAlert({
                icon: 'info',
                title: '<strong>Inicio de sesion requerido</strong>',
                html:
                    'Para agregar productos y poder disfrutar de todas nuestras funcionalidades' +
                    ' te invitamos a iniciar sesion o crear una cuenta.',
                confirmButtonText: 'Iniciar sesion',
                confirmButtonAriaLabel: 'Thumbs up, great!',
                link: '/api/auth/login'
            })
        } else {
            const button = document.getElementById(
                `buttonCart${clickedItem.id}`
            ) as HTMLButtonElement
            button.classList.add('clicked')
            if (!clickedItem.amount) clickedItem.amount = 0
            setCartProduct(() => {
                // is the item already added in the cart

                if (cartProduct.id === clickedItem.id) {
                    return {
                        ...cartProduct,
                        amount: cartProduct.amount! + 1,
                        stock: cartProduct.stock - 1
                    }
                }

                // first time the item is added
                return {
                    ...clickedItem,
                    amount: 1,
                    stock: clickedItem.stock - 1
                }
            })
            setTimeout(() => {
                button.classList.remove('clicked')
            }, 2300)
        }
    }
    useEffect(() => {
        refetch()
    }, [id])
    useEffect(() => {
        // storing input cartProducts
        if (cartProduct.hasOwnProperty('id')) {
            setProducts(() => {
                const isItemInCart = products.find(
                    prod => prod.id === cartProduct.id
                )
                if (isItemInCart) {
                    return products.map(prod =>
                        prod.id === cartProduct.id
                            ? {
                                  ...prod,
                                  amount: cartProduct.amount!,
                                  stock: cartProduct.stock
                              }
                            : prod
                    )
                }
                return [...products, { ...cartProduct }]
            })
        } else if (products.length) {
            setProducts([...products])
        } else {
            setProducts([])
        }
    }, [cartProduct])

    return (
        <MainLayout title="Pawsitive - Productos">
            <div className="flex flex-wrap justify-center items-center">
                {isLoading ? (
                    <div className="flex justify-center items-center my-16">
                        <Image
                            src={Loading}
                            alt="not found"
                            width={100}
                            height={100}
                        />
                    </div>
                ) : error ? (
                    <p>Not found</p>
                ) : (
                    <div className="flex flex-col">
                        <ProductDetailComp
                            product={product}
                            addToCart={handleAddToCart}
                        />
                        <div className="flex relative justify-between gap-5">
                            <div className="flex flex-col w-full">
                                <div className="w-full bg-pwgreen-100">
                                    <h2 className="title text-xl lg:text-2xl px-6">
                                        Reviews
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 py-6 px-4 gap-4">
                                        {product.review ? (
                                            product.review.map(
                                                (review: Review) => (
                                                    <ProductReviews
                                                        key={review.id}
                                                        id={review.id}
                                                        review={review}
                                                    />
                                                )
                                            )
                                        ) : (
                                            <h2 className="title text-2xl">
                                                Todavía no hay reviews en este
                                                producto!
                                            </h2>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <ProductReviewForm
                                        id={product.id}
                                        userBoughtProduct={userBoughtProduct}
                                    />
                                    {userAlreadyReview ? (
                                        <div className="flex justify-content-center w-auto mx-5 rounded-lg px-1 py-1 border-2 border-pwpurple-700">
                                            <p className="text-center col-start-2 col-span-4">
                                                Sabemos que adquiriste nuestro
                                                producto y agradecemos que
                                                dejaras tu reseña, si deseas
                                                agregar alguna otra sugerencia o
                                                comentario, te invitamos
                                                contactarte con nosotros
                                                haciendo{' '}
                                                <b className="text-pwpurple-700">
                                                    <Link href="/contact">
                                                        click aqui
                                                    </Link>
                                                </b>
                                            </p>
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                            <div className="hidden md:w-3/6 xl:w-2/6 md:block bg-pwgreen-100">
                                <h2 className="title font-semibold text-xl">
                                    Productos relacionados
                                </h2>
                                <ProductsPromotion
                                    category={product.category}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </MainLayout>
    )
}

export default ProductDetail
