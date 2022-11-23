import { prisma } from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { name, price, description, amount, photo, active, user } = req.body;
    try {
        if(!user){

            await prisma.items.create({
                data: {
                    name,
                    price,
                    description,
                    amount,
                    photo,
                    active
                }
            })
        }
        else{
            await prisma.items.create({
                data: {
                    name,
                    price,
                    description,
                    amount,
                    photo,
                    active,
                    user: {
                        connect: [{id: user}]
                    }
                }
            })
        }
        res.status(201).json({ message: "Item created" })
    } catch (error) {        
        res.status(400).json({ message: "Error: " +error })
    }

}