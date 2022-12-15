import { NextApiRequest, NextApiResponse } from "next";

export default async function payment(req: NextApiRequest, res: NextApiResponse) {
    const Stripe = require('stripe');
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    
    
    try {
        const balance = await stripe.balance.retrieve();
        // console.log(payment);
        res.status(200).json(balance);

    } catch (error: any) {
        console.log(error.raw.message)
        res.status(401).send({ Error: error.raw.message });
    }

};
