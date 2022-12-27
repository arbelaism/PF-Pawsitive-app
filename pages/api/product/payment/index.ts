import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2022-11-15'
})

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST')
        res.status(405).end('Method Not Allowed')
        return
    }
    const {
        totalPrice,
        payment_intent_id
    }: { totalPrice: number; payment_intent_id?: string } = req.body
    if (payment_intent_id) {
        try {
            const current_intent = await stripe.paymentIntents.retrieve(
                payment_intent_id
            )
            if (current_intent) {
                const updated_intent = await stripe.paymentIntents.update(
                    payment_intent_id,
                    {
                        amount: totalPrice
                    }
                )
                res.status(200).json(updated_intent)
                return
            }
        } catch (e) {
            if ((e as any).code !== 'resource_missing') {
                const errorMessage =
                    e instanceof Error ? e.message : 'Internal server error'
                res.status(500).json({ statusCode: 500, message: errorMessage })
                return
            }
        }
    }
    try {
        const params: Stripe.PaymentIntentCreateParams = {
            amount: totalPrice * 100,
            currency: 'usd',
            automatic_payment_methods: {
                enabled: true
            }
        }
        const payment_intent: Stripe.PaymentIntent =
            await stripe.paymentIntents.create(params)

        res.status(200).json(payment_intent)
    } catch (err) {
        const errorMessage =
            err instanceof Error ? err.message : 'Internal server error'
        res.status(500).json({ statusCode: 500, message: errorMessage })
    }
}
