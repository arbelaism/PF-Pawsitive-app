import { Stripe, loadStripe } from '@stripe/stripe-js'

let stripePromise: Promise<Stripe | null>

const getStripe = () => {
    if (!stripePromise) {
        stripePromise = loadStripe(
            'pk_test_51MCoCQKy1tWUr0G9bIjjBwCg9hCK7rC3pD3n0bR5rsjwROzCWBcoyHahEa62IEsd3gRfOdysQM9j4NzbygKCB8it00XjZLuyTi'
        )
    }

    return stripePromise
}

export default getStripe
