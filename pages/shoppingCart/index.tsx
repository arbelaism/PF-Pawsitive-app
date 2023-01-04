import { NextPage } from 'next'
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'
import { MainLayout, ShoppingCart, ModalPayment } from 'components'
import { Product } from 'app/types'
import { useEffect, useState } from 'react'
import useLocalStorage from 'use-local-storage'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const Cart: NextPage = withPageAuthRequired(() => {
    const [loading, setLoading] = useState(false)
    const [cartProducts, setCartProducts] = useState<Product[]>([])
    const [products, setProducts] = useLocalStorage<Product[]>(
        'cartProducts',
        []
    )

    const getTotalPrice = () => {
        return cartProducts.reduce(
            (acc, product) => acc + product.amount! * product.displayPrice,
            0
        )
    }

    useEffect(() => {
        setLoading(true)
        setCartProducts(products)
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }, [])

    useEffect(() => {
        // storing input cartProducts
        setLoading(true)
        if (cartProducts.length) {
            setProducts(cartProducts)
        } else {
            setProducts([])
        }

        setTimeout(() => {
            setLoading(false)
        }, 500)
    }, [cartProducts])

    const priceToPay = getTotalPrice()

    return (
        <MainLayout title="Pawsitive - Carrito">
            <div className='w-full h-max flex flex-col items-center'>
                {loading ? (
                    <div className="flex justify-center items-center gap-3 h-screen">
                        <AiOutlineLoading3Quarters className="text-4xl animate-spin text-pwpurple-700" />
                    </div>
                ) : (
                    <>
                        <ShoppingCart
                            setProd={setProducts}
                            setCartProd={setCartProducts}
                        />
                        {products.length > 0 && cartProducts.length > 0 && (
                            <ModalPayment price={priceToPay} />
                        )}
                    </>
                )}
            </div>
        </MainLayout>
    )
})

export default Cart
