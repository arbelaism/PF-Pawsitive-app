import { NextApiRequest, NextApiResponse } from "next";

export default async function payment(req: NextApiRequest, res: NextApiResponse) {
    const Stripe = require('stripe');
    const stripe = new Stripe("sk_test_51M9y5pEAdwcBn8LBUJhWL1X4Qgj4vN1PpZltKGdMg6dgCbouXSuRiYefasaaysNik3NdoMX4HdnpDEZNrDkQ3eiW00A289ySnS");
    
    
    try {
        const balance = await stripe.balance.retrieve();
        // console.log(payment);
        res.status(200).json(balance);

    } catch (error: any) {
        console.log(error.raw.message)
        res.status(401).send({ Error: error.raw.message });
    }

};
