import { prisma } from "../../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";



export default async function getItems(req: NextApiRequest, res: NextApiResponse) {
    
    try {       

        const Items = await prisma.item.findMany({
            where:{
                active:true
            },
            select:{
                name: true,
                price: true,
                amount: true,
                professionalBusiness: {
                    select: {
                        businessName:true
                    }
                }
            }
        })        
        
        res.status(200).json(Items)
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Error: " +error })
    }
    
}