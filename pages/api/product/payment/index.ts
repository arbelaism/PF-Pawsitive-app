import { NextApiRequest, NextApiResponse } from "next";

export default async function payment(req: NextApiRequest, res: NextApiResponse) {
    const Stripe = require('stripe');
    const stripe = new Stripe("sk_test_51M9y5pEAdwcBn8LBUJhWL1X4Qgj4vN1PpZltKGdMg6dgCbouXSuRiYefasaaysNik3NdoMX4HdnpDEZNrDkQ3eiW00A289ySnS");
    const { totalPrice, id } = req.body;
    
    try {
        const payment = await stripe.paymentIntents.create({
            amount: totalPrice*100,
            currency: 'USD',
            description: 'List cart',
            payment_method: id,
            confirm: true
        });
        // console.log(payment);
        res.status(201).send({message: 'Successful payment'});

    } catch (error: any) {
        console.log(error.raw.message)
        res.status(401).send({Error: error.raw.message});
    }

};
