import { prisma } from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function itemById(req: NextApiRequest, res: NextApiResponse){
    
    const { iditem } = req.query
    try {       
        if(iditem){

            const item = await prisma.items.findUnique({
                where:{
                   id: iditem.toString()
                },
                include:{                    
                    profesionalBusiness: {
                        select: {
                            businessName:true
                        }
                    }
                }
            })
            res.status(200).json(item)
        }
        else{
            res.status(200).send("Item not found")
        }        
        
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Error: " +error })
    }
    
}