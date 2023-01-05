import { NextPage } from 'next'
import { useState, useEffect } from 'react'
import React from 'react'
import { PaginationSize, Product } from 'app/types'
import { MainLayout, Filtersproducts } from 'components'
import ProductCard from 'components/products/ProductCard'
import { useQuery } from 'react-query'
import { getProducts } from 'utils/dbFetching'
import { redirectionAlert } from 'utils/alerts'
import AlternativePagination from 'components/layout/AlternativePagination'
import useLocalStorage from 'use-local-storage'
import { useUser } from '@auth0/nextjs-auth0/client'
import { useRouter } from 'next/router'
import { useMediaQuery } from 'react-responsive'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { ImSad } from 'react-icons/im'

export type Props = {
    [key: string]: any
}

const Products: NextPage = () => {
    //pagination anda data for filter
    const {
        data: products,
        error,
        isLoading,
        isSuccess
    } = useQuery(['products'], getProducts)

    const [currentPage, setCurrentPage] = useState<number>(1)
    const [itemsPerPage, setItemsPerPage] = useState<number>(6)
    const [paginationSize, setPaginationSize] = useState<PaginationSize>(
        PaginationSize.large
    )
    const [data, setData] = useState<Product[]>()

    const isMobile = useMediaQuery({ minWidth: 0, maxWidth: 768 })
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 })
    const isLaptop = useMediaQuery({ minWidth: 1024, maxWidth: 1280 })
    const isMediumScreen = useMediaQuery({ minWidth: 1280, maxWidth: 1536 })
    const isBigScreen = useMediaQuery({ minWidth: 1536 })

    //get user data from auth0
    const { user, error: errorU, isLoading: isLoadingU } = useUser()
    const router = useRouter()

    let userId: string = ''
    if (!isLoadingU && user && user.sub) {
        userId = user.sub
    }

    //Recover cartproducts when user comeback from the cart to products again
    const [cartFromLocalStorage, setCartFromLocalStorage] = useLocalStorage<
        Product[]
    >('cartProducts', [])
    const [cartItems, setCartItems] = useState(
        cartFromLocalStorage as Product[]
    )

    //pagination
    const lastItemIndex = currentPage * itemsPerPage
    const firstItemIndex = lastItemIndex - itemsPerPage
    let currentItems: Product[] = []
    if (data) currentItems = [...data.slice(firstItemIndex, lastItemIndex)]

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
            setCartItems(prev => {
                // is the item already added in the cart
                const isItemInCart = prev.find(
                    item => item.id === clickedItem.id
                )

                if (isItemInCart) {
                    return prev.map(item =>
                        item.id === clickedItem.id
                            ? { ...item, amount: item.amount! + 1 }
                            : item
                    )
                }

                // first time the item is added
                return [...prev, { ...clickedItem, amount: 1 }]
            })

            setTimeout(() => {
                button.classList.remove('clicked')
            }, 2300)
        }
    }

    useEffect(() => {
        if (isSuccess) {
            setData(products)
            if (isMobile) {
                setItemsPerPage(6)
                setPaginationSize(PaginationSize.small)
            } else if (isTablet) {
                setItemsPerPage(8)
                setPaginationSize(PaginationSize.medium)
            } else if (isLaptop) {
                setItemsPerPage(9)
                setPaginationSize(PaginationSize.large)
            } else if (isMediumScreen) {
                setItemsPerPage(12)
                setPaginationSize(PaginationSize.large)
            } else if (isBigScreen) {
                setItemsPerPage(15)
                setPaginationSize(PaginationSize.large)
            }
        }
    }, [
        isSuccess,
        products,
        isBigScreen,
        isMobile,
        isTablet,
        isLaptop,
        isMediumScreen
    ])

    useEffect(() => {
        setData(products)
    }, [products])

    useEffect(() => {
        // storing input cartItems
        // localStorage.setItem("cartProducts", JSON.stringify(cartItems));
        setCartFromLocalStorage(cartItems)
    }, [cartItems])

    return (
        <MainLayout title="Pawsitive - Productos">
            <div className="px-4 py-1 w-full flex justify-between items-center bg-transparent">
                <h1 className="text-3xl font-Rubik text-pwgreen-800 font-bold py-4 lg:py-8 lg:text-5xl">
                    Productos
                </h1>
            </div>
            <div className="flex">
                <div className="flex grow flex-col justify-center gap-3 items-center bg-transparent">
                    {!isLoading && currentItems ? (
                        <AlternativePagination
                            totalItems={(data ? data : products)?.length}
                            itemsPerPage={itemsPerPage}
                            setCurrentPage={setCurrentPage}
                            size={paginationSize}
                        />
                    ) : null}
                    <div
                        className={`${
                            currentItems.length === 0 ? 'flex' : 'grid'
                        } grid-cols-1 gap-2 md:grid-cols-2 md:gap-3 lg:grid-cols-3 xl:grid-cols-4 xl:gap-4 2xl:grid-cols-5 mb-8`}>
                        {isLoading ? (
                            <div className="flex justify-center items-center gap-3 my-16">
                                <AiOutlineLoading3Quarters className="text-4xl animate-spin text-pwpurple-700" />
                            </div>
                        ) : currentItems.length === 0 ? (
                            <div className="flex flex-col justify-center items-center my-16">
                                <ImSad className="text-5xl text-pwpurple-700" />
                                <h1 className="font-bold text-3xl">
                                    No encontramos items
                                </h1>
                            </div>
                        ) : (
                            currentItems.map((product: any) => {
                                return (
                                    <ProductCard
                                        key={product.id}
                                        id={product.id}
                                        product={product}
                                        handleAddToCart={handleAddToCart}
                                    />
                                )
                            })
                        )}
                    </div>
                </div>
                <div className="w-auto fixed flex justify-center items-center left-0 inset-y-0 lg:sticky lg:right-5">
                    <Filtersproducts
                        setData={setData}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
            </div>
        </MainLayout>
    )
}

export default Products
