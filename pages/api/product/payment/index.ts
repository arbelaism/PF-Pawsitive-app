import { NextApiRequest, NextApiResponse } from "next";

export default async function payment(req: NextApiRequest, res: NextApiResponse) {
    const Stripe = require('stripe');
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const { totalPrice, id } = req.body;
    
    try {
        const payment = await stripe.paymentIntents.create({
            amount: totalPrice*100,
            currency: 'USD',
            description: 'List cart',
            payment_method: id,
            confirm: true
        });
       
        res.status(201).send({message: 'Successful payment'});

    } catch (error: any) {
        console.log(error.raw.message)
        res.status(401).send({Error: error.raw.message});
    }

};
