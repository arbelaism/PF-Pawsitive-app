import { prisma } from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function disbleItem(req: NextApiRequest, res: NextApiResponse){
    
    const { id } = req.body

    try {
        const item = await prisma.items.update({
            where: {
              id: id,
            },
            data: {
              active: false,
            },
          })
        res.status(200).json({message: "Item "+item.name+" disabled"})
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Error: " +error })
    }
      
}