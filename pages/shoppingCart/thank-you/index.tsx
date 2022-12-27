import { useUser } from '@auth0/nextjs-auth0/client'
import { CheckIn, Product } from 'app/types'
import axios from 'axios'
import { MainLayout } from 'components'
import React, { useCallback, useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import useLocalStorage from 'use-local-storage'
import { checkEmail } from 'utils/checkEmail'
import { sendPaymentMail } from 'utils/dbFetching'
import { FaRegSmileWink } from 'react-icons/fa'
import Link from 'next/link'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const ThankYou = () => {
    const [fetchingData, setFetchingData] = useState(false)
    const [transactionId, setTransactionId] = useState<string | undefined>(
        undefined
    )
    const [message, setMessage] = useState<string | undefined>(undefined)
    const { user, error: err, isLoading: load } = useUser()
    const [products, setProducts] = useLocalStorage<Product[]>(
        'cartProducts',
        []
    )

    let userId: string = ''
    if (!load && user && user.sub) {
        userId = user.sub
    }

    const getTotalPrice = useCallback(() => {
        return products.reduce(
            (acc, product) => acc + product.amount! * product.displayPrice,
            0
        )
    }, [products])

    const { mutate, isLoading } = useMutation(sendPaymentMail, {
        onSuccess: data => {
            setMessage('Sent')
            setProducts([])
        },
        onError: () => {
            setMessage('error')
        }
    })

    const addTransaction = async (products: Product[]) => {
        if (products.length <= 0) return
        if (!user) return
        if (transactionId) return

        const amount = getTotalPrice()
        try {
            const productsT = products.map(product => {
                return { quantity: product.amount, productId: product.id }
            })

            const dataT = {
                amount: amount,
                userId: userId,
                quantity: productsT
            }

            const { data } = await axios.post('/api/transaction', dataT)

            setTransactionId(data.id)
        } catch (error) {
            console.log('transaction', error)
        }
    }

    const deleteTransactionProducts = (products: Product[]) => {
        if (products.length <= 0) return
        try {
            products.map(async product => {
                if (product.amount) {
                    await axios.put(`/api/product/${product.id}`, {
                        stock: product.stock - product?.amount
                    })
                }
            })
        } catch (error) {
            console.log('removeProducts', error)
        }
    }

    const sendMail = async (products: Product[]) => {
        if (products.length <= 0) return

        if (user?.name && user.nickname && user.sub) {
            try {
                let email: string = checkEmail(user.sub, user.nickname)
                if (email && email === 'auth0') {
                    email = user.name
                }
                let paymentData: CheckIn = {
                    name: user!.name,
                    idT: transactionId,
                    email: email,
                    products: products,
                    total: getTotalPrice(),
                    action: 'sell'
                }
                mutate(paymentData)
            } catch (error) {
                console.log('email', error)
            }
        }
    }

    useEffect(() => {
        setFetchingData(true)
        if (products.length > 0 && fetchingData) {
            if (!transactionId) {
                addTransaction(products)
                deleteTransactionProducts(products)
            }

            if (transactionId && !message) {
                sendMail(products)
                setProducts([])
            }
        }

        return () => {
            setFetchingData(false)
        }
    }, [fetchingData, message, transactionId])

    return (
        <MainLayout title="¡Gracias! - Pawsitive">
            <div className="w-full mx-auto h-[75vh] flex flex-col justify-center items-center gap-3">
                <FaRegSmileWink className="title text-6xl lg:text-8xl" />
                <h1 className="title text-2xl lg:text-5xl">
                    ¡Gracias por tu compra!
                </h1>
                {!message ? (
                    <div className="flex text-center justify-center items-center gap-2 my-4">
                        <AiOutlineLoading3Quarters className="text-2xl animate-spin text-pwpurple-700" />
                        Enviando email...
                    </div>
                ) : (
                    <div className='text-center'>
                        <p className="text-sm lg:text-base">
                            Te enviamos un email con los datos de tu compra.
                        </p>
                        <p className="text-sm lg:text-base">
                            Tu numero de factura es:{' '}
                            <span className="font-semibold">
                                #{transactionId}
                            </span>
                        </p>
                        <p className="text-sm lg:text-base">
                            También podes ver tu compra en el Dashboard haciendo{' '}
                            <Link href={'/profile/transaction'}>
                                <a className="underline text-pwpurple-600 hover:text-pwpurple-800 transition-all">
                                    click acá
                                </a>
                            </Link>
                            .
                        </p>
                    </div>
                )}
            </div>
        </MainLayout>
    )
}

export default ThankYou
