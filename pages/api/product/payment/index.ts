import { NextApiRequest, NextApiResponse } from 'next'

export default async function payment(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const Stripe = require('stripe')
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    const { totalPrice } = req.body

    if (!totalPrice)
        return res.status(404).json({ message: 'Must provide totalPrice' })

    try {
        const payment = await stripe.paymentIntents.create(
            {
                amount: totalPrice * 100,
                currency: 'USD',
                payment_method_types: ['card'],
                setup_future_usage: 'off_session'
            },
            {
                apiKey: process.env.STRIPE_SECRET_KEY
            }
        )

        res.status(201).json({ client_secret: payment.client_secret })
    } catch (error: any) {
        console.log(error.raw.message)
        res.status(401).send({ Error: error.raw.message })
    }
}
