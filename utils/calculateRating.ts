import { Review } from 'app/types'

export const calculateRating = (review: Review[]) => {
    if (review.length < 1) return 1

    return review.reduce((acc, review) => acc + review.rating, 0) / review.length
}
