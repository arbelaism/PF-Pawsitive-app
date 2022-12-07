import { NextComponentType } from 'next';
import { Product } from 'app/types'
import Link from 'next/link';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useQuery } from 'react-query';
import { getProducts } from 'utils/dbFetching';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import ProductsScreenCard from 'components/products/productsScreen/ProductsScreenCard';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])

const ProductsScreen: NextComponentType = () => {
    const {
        data: products,
        error,
        isLoading,
        isSuccess
    } = useQuery(['products'], getProducts);

    let productsList: Product[] = []
    if (products) productsList = [...products.slice(1, 16)];

    return (

        <div className='p-10 bg-pwpurple-200 mb-15 shadow-xl'>
                {isLoading ? 
                
                <h1>Cargando...</h1>
                :
                <div>
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    navigation
                    pagination={{ clickable: true }}
                    spaceBetween={20}
                    slidesPerView={3}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}                
                >
                    {productsList.map((product:any)=>{
                        
                        return (
                            <SwiperSlide>
                                <ProductsScreenCard
                                    key={product.id}
                                    id={product.id}
                                    product={product}
                                />

                            </SwiperSlide>
                        )                        
                    })}              
                </Swiper>
                <div className='text-center pt-5'>
                    <Link href="/products/">
                        <button className="font-Rubik text-l font-bold rounded-lg px-1 py-1 border-2 border-pwpurple-700 text-pwpurple-700 hover:bg-pwpurple-700 hover:text-pwpurple-100 duration-300">
                            Ver Productos
                        </button>
                    </Link>
                </div>

                </div>
                }
             </div>

    );
};
export default ProductsScreen;