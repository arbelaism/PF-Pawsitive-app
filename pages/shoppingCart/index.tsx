import { NextPage } from 'next'
import Image from 'next/image'
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'
import { MainLayout, ShoppingCart, ModalPayment } from 'components'
import { Product } from 'app/types'
import { useCallback, useEffect, useState } from 'react'
import useLocalStorage from 'use-local-storage'
import Loading from 'public/loading.gif'

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
            <>
                {loading ? (
                    <div className="flex justify-center items-center h-[75vh]">
                        <Image
                            src={Loading}
                            alt="not found"
                            width={100}
                            height={100}
                        />
                    </div>
                ) : (
                    <>
                        <ShoppingCart />
                        {products.length > 0 && cartProducts.length > 0 && (
                            <ModalPayment price={priceToPay} />
                        )}
                    </>
                )}
            </>
        </MainLayout>
    )
})

export default Cart
