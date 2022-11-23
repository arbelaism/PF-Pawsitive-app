import { prisma } from "../../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function updateItemById(req: NextApiRequest, res: NextApiResponse){
    const data = req.body
    const { id } = req.query
    try { 
        const item = await prisma.item.update({
            where: {
              id: id?.toString()
            },
            data
          })
        res.status(200).json(item) 
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Error: " +error })
    }    
}