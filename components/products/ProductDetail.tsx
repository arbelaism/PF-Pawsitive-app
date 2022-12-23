import { Review } from 'app/types'
import { Product } from 'app/types'
import Image from 'next/image'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { FaShoppingCart, FaBox } from 'react-icons/fa'

type Props = {
    product: Product
    addToCart: (clickedProduct: Product) => void
}

const ProductDetailComp = ({ product, addToCart }: Props) => {
    let ratings: number[] = []
    let sumRating = 0
    let generalRating = 0
    let stars = []
    if (product.review.length) {
        ratings = product.review.map((review: Review) => review.rating)
        sumRating = ratings.reduce((acc, rating, i) => acc + rating)
        generalRating = sumRating / ratings.length
        for (let i = 0; i < 5; i++) {
            if (i < Math.round(generalRating)) stars.push(true)
            if (i >= Math.round(generalRating)) stars.push(false)
        }
    } else {
        for (let i = 0; i < 5; i++) {
            stars.push(false)
        }
    }

    return (
        <div
            key={product.id}
            className="bg-white flex flex-col items-center justify-between">
            <div className="flex items-center justify-center gap-5 py-6">
                <div className="p-8 w-2/6">
                    <Image
                        src={product.photo}
                        alt="No image to display"
                        width={350}
                        height={350}
                    />
                </div>
                <div className="flex flex-col items-start gap-1 lg:gap-2 justify-between h-auto w-4/6">
                    <h2 className="title text-xl lg:text-4xl">
                        {product.name}
                    </h2>
                    <div className="flex items-center gap-0.5">
                        {stars.map((star, idx) => {
                            if (star === true) {
                                return <AiFillStar key={idx} />
                            }
                            if (star === false) {
                                return <AiOutlineStar key={idx} />
                            }
                        })}
                        <p>{'(' + ratings.length + ')'}</p>
                    </div>
                    <div className="flex justify-between items-center w-full">
                        <p className="text-xl font-semibold text-pwpurple-700 lg:text-3xl">
                            ${product.displayPrice}
                        </p>
                        <div className="mr-8">
                            <button
                                onClick={() => addToCart(product)}
                                disabled={product.stock <= 1 && true}
                                className="cart-button"
                                id={'buttonCart' + product.id}>
                                <span className="add-to-cart font-semibold flex gap-1 items-center justify-center">
                                    +
                                    <FaShoppingCart />
                                </span>
                                <span className="added">Agregado</span>
                                <span className="fa-shopping-cart">
                                    <FaShoppingCart />
                                </span>
                                <span className="fa-box">
                                    <FaBox />
                                </span>
                            </button>
                        </div>
                    </div>
                    <div className='mt-2 mx-8 self-end'>
                        {product.stock < 1 ? (
                            <p className="font-medium text-xs lg:text-sm text-slate-400">
                                No hay stock disponible por el momento.
                            </p>
                        ) : (
                            <p className="font-medium text-xs lg:text-sm text-slate-400">
                                Unidades disponibles: {product.stock}
                            </p>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-3 w-full justify-center px-6 py-10 bg-pwgreen-100">
                <h2 className="title text-2xl">Descripción del producto</h2>
                <p className="text-base text-justify">{product.description}</p>
            </div>
        </div>
    )
}

export default ProductDetailComp
