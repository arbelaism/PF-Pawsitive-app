import { Product } from 'app/types'
import Link from 'next/link'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useQuery } from 'react-query'
import { getProducts } from 'utils/dbFetching'
import Image from 'next/image'
import Loading from 'public/loading.gif'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import ProductsScreenCard from 'components/products/productsScreen/ProductsScreenCard'

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])

const ProductsScreen = () => {
    const {
        data: products,
        error,
        isLoading,
        isSuccess
    } = useQuery(['products'], getProducts)

    let productsList: Product[] = []
    if (products) productsList = [...products.slice(1, 16)]

    return (

        <div className="p-10 w-full bg-pwgreen-100 h-screen flex flex-col justify-center shadow-xl">
            <div className="flex flex-col justify-center gap-3">
                <h1 className="title">Productos</h1>
                <p className="text-base lg:text-xl xl:text-2xl">
                    Tenemos los mejores productos para tu mascota.
                </p>
            </div>
            {isLoading ? (
                <div className="flex justify-center items-center my-16">
                    <Image
                        src={Loading}
                        alt="not found"
                        width={100}
                        height={100}
                    />
                </div>
            ) : (
                <div>
                    <Swiper
                        breakpoints={{
                            400: {
                                width: 400,
                                slidesPerView: 1
                            },
                            768: {
                                width: 768,
                                slidesPerView: 2
                            },
                            1024: {
                                width: 1024,
                                slidesPerView: 4
                            }
                        }}
                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                        navigation
                        pagination={{ clickable: true }}
                        spaceBetween={20}
                        slidesPerView={4}
                        onSlideChange={() => console.log('slide change')}
                        onSwiper={swiper => console.log(swiper)}>
                        {productsList.map((product: any) => {
                            return (
                                <SwiperSlide key={product.id}>
                                    <ProductsScreenCard
                                        key={product.id}
                                        id={product.id}
                                        product={product}
                                    />
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                    <div className="text-end pt-5">
                        <Link href="/products/">
                            <button className="font-Rubik uppercase text-base font-bold rounded-lg px-3 py-2 text-pwgreen-800 hover:bg-pwgreen-800 hover:text-pwgreen-50 duration-300 lg:text-base lg:py-4 lg:px-5">
                                Ver todos los productos
                            </button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}
export default ProductsScreen
