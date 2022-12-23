import { Review } from 'app/types'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'

type Props = {
    review: Review
    id: string
}

const ProductReviews = ({ id, review }: Props) => {
    let stars = []
    for (let i = 0; i < 5; i++) {
        if (i < review.rating) stars.push(true)
        if (i >= review.rating) stars.push(false)
    }

    return (
        <div
            key={id}
            className="flex justify-between items-center rounded-md w-full px-4 py-6 bg-pwgreen-50 shadow-md">
            <h2 className="text-pwgreen-900 font-Rubik text-base font-medium w-1/4">
                {review.user?.firstName + ' ' + review.user?.lastName}
            </h2>
            <div className="flex flex-col gap-2 items-start w-3/4">
                <div className="flex items-center text-pwpurple-700">
                    {stars.map((star, idx) => {
                        if (star === true) {
                            return <AiFillStar key={idx} />
                        }
                        if (star === false) {
                            return <AiOutlineStar key={idx} />
                        }
                    })}
                </div>
                <p className='text-sm lg:text-base'>{review.review}</p>
                <div className="justify-self-center w-full">
                    <p className="text-right text-sm lg:text-base font-bold text-pwpurple-700">
                        {String(review.createdAt).slice(0, 10)}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ProductReviews
