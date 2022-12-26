import { Stripe, loadStripe } from '@stripe/stripe-js'

let stripePromise: Promise<Stripe | null>

const STRIPE_PUBLIC_KEY = process.env.STRIPE_PUBLIC_KEY

const getStripe = () => {
    if (!STRIPE_PUBLIC_KEY) return

    if (!stripePromise) {
        stripePromise = loadStripe(STRIPE_PUBLIC_KEY)
    }

    return stripePromise
}

export default getStripe
