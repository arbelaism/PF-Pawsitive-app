import { prisma } from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { name, price, description, amount, photo, active, userId } = req.body;
    try {
        if(!userId){

            await prisma.item.create({
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
            const professional = await prisma.professionalBusiness.findFirst({
                where : {
                    ownerBusiness : {
                        is : {
                            id : userId
                        }
                    }
                },
                select : {
                    id : true,
                }
            })

            await prisma.item.create({
                data: {
                    name,
                    price,
                    description,
                    amount,
                    photo,
                    active,
                    user: {
                        connect: [{id: userId}]
                    },
                    professionalBusiness : {
                        connect : [{id: professional?.id}]
                    }
                }
            })
        }
        res.status(201).json({ message: "Item created" })
    } catch (error) {        
        res.status(400).json({ message: "Error: " +error })
    }}