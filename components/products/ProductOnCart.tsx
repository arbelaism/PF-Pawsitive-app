import { Product } from 'app/types'
import Image from 'next/image'

type Props = {
    product: Product
    addToCart: (clickedProduct: Product) => void
    removeFromCart: (id: string) => void
}

const CartProduct = ({ product, addToCart, removeFromCart }: Props) => {
    return (
        <div className="flex flex-row lg:flex-col px-4 py-6 font-Rubik w-full min-h-full h-max lg:w-auto justify-evenly bg-white rounded-md border border-pwgreen-500 text-pwgreen-800">
            <div>
                <Image
                    src={product.photo}
                    alt="No image to display"
                    width="100%"
                    height="100%"
                    objectFit="cover"
                />
            </div>
            <div className="w-full justify-between flex flex-col">
                <div className="h-1/4 my-2">
                    <p className="text-xs lg:text-sm text-slate-500">{product.name}</p>
                </div>
                <div className="w-auto text-md flex h-3/4 justify-around items-center flex-row font-semibold">
                    <div className="flex justify-between items-center w-20 rounded-md text-base bg-pwgreen-600 text-pwgreen-50">
                        <button
                            className="w-6 py-0.5 px-1 h-auto rounded-l-md text-pwgreen-50 hover:bg-pwgreen-800 transition-all"
                            onClick={() => removeFromCart(product.id)}>
                            -
                        </button>
                        <p>{product.amount}</p>
                        <button
                            className="w-6 py-0.5 px-1 h-auto rounded-r-md text-pwgreen-50 hover:bg-pwgreen-800 transition-all"
                            disabled={product.stock <= 1 && true}
                            onClick={() => addToCart(product)}>
                            +
                        </button>
                    </div>
                    <p className="font-bold text-lg">
                        ${product.amount! * product.displayPrice}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default CartProduct
