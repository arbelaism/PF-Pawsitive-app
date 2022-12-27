import { Product } from 'app/types'
import { useState, useEffect } from 'react'
import ProductOnCart from 'components/products/ProductOnCart'
import useLocalStorage from 'use-local-storage'
import { FiShoppingBag } from 'react-icons/fi'
import Link from 'next/link'

const ShoppingCart = () => {
    // let products : Product[] = [];
    const [cartProducts, setCartProducts] = useState<Product[]>([])
    const [products, setProducts] = useLocalStorage<Product[]>(
        'cartProducts',
        []
    )
    const handleAddToCart = (clickedItem: Product) => {
        if (!clickedItem.amount) clickedItem.amount = 0
        setCartProducts(prev => {
            // is the item already added in the cart
            const isItemInCart = prev.find(item => item.id === clickedItem.id)

            if (isItemInCart) {
                return prev?.map(item =>
                    item.id === clickedItem.id
                        ? {
                              ...item,
                              amount: item.amount! + 1,
                              stock: item.stock - 1
                          }
                        : item
                )
            }

            // first time the item is added
            return [
                ...prev,
                { ...clickedItem, amount: 1, stock: clickedItem.stock - 1 }
            ]
        })
    }
    const handleRemoveFromCart = (id: string) => {
        setCartProducts(prev =>
            prev.reduce((acc, item) => {
                if (item.id === id) {
                    if (item.amount === 1) return acc
                    return [
                        ...acc,
                        {
                            ...item,
                            amount: item.amount! - 1,
                            stock: item.stock + 1
                        }
                    ]
                } else {
                    return [...acc, item]
                }
            }, [] as Product[])
        )
    }
    const getTotalPrice = () => {
        return cartProducts.reduce(
            (acc, product) => acc + product.amount! * product.displayPrice,
            0
        )
    }

    useEffect(() => {
        setCartProducts(products)
    }, [])

    useEffect(() => {
        // storing input cartProducts
        if (cartProducts.length) {
            setProducts(cartProducts)
        } else {
            setProducts([])
        }
    }, [cartProducts])

    return (
        <div className="flex flex-col w-full lg:w-3/4 m-auto h-full py-6 rounded-xl">
            <div className="flex justify-between items-center mx-6">
                <h1 className="title text-pwgreen-800 text-xl lg:text-3xl">
                    Carrito de compras
                </h1>
                <button
                    onClick={() => {
                        setCartProducts([])
                        setProducts([])
                    }}
                    className="text-xs md:text-sm text-pwgreen-800 hover:bg-pwgreen-200 py-2 px-3 rounded-md disabled:bg-transparent disabled:text-slate-500 transition-all"
                    disabled={cartProducts.length === 0}>
                    Limpiar carrito
                </button>
            </div>
            {cartProducts.length === 0 ? (
                <div className="flex items-center flex-col gap-3 justify-center h-[65vh]">
                    <FiShoppingBag className="title text-9xl animate-bounce" />
                    <h2 className="title text-4xl font-normal">
                        Tu carrito está vacío :(
                    </h2>
                    <p className="text-sm text-slate-500">
                        Parece que no has agregado nada a tu carrito. Te
                        invitamos a que explores nuestro petshop. Tenemos los
                        mejores productos para tu mascota!
                    </p>
                    <Link href={'/products'}>
                        <a className="dashboardButton uppercase text-base bg-pwgreen-700 text-pwgreen-50">
                            Ir a la tienda
                        </a>
                    </Link>
                </div>
            ) : (
                <>
                    <div className="w-full p-4 text-center lg:flex">
                        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-3 lg:justify-around">
                            {cartProducts.map((product: Product) => (
                                <ProductOnCart
                                    key={product.id}
                                    product={product}
                                    addToCart={handleAddToCart}
                                    removeFromCart={handleRemoveFromCart}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="w-full border bg-pwgreen-600 text-pwgreen-50 border-t-pwgreen-800 p-8">
                        <div className="flex flex-row justify-between font-Rubik lg:justify-around w-full">
                            <h3 className="text-lg lg:text-xl text-pwgreen-50">
                                Total:
                            </h3>
                            <h3 className="text-lg font-semibold lg:text-xl text-pwgreen-50">
                                ${getTotalPrice()}
                            </h3>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default ShoppingCart
