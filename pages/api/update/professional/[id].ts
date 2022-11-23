import { prisma } from "../../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function updateProfessionalBusinessById(req: NextApiRequest, res: NextApiResponse){
    const data = req.body
    const { id } = req.query
    try { 
        const professionalBusiness = await prisma.professionalBusiness.update({
            where: {
              id: id?.toString()
            },
            data
          })
        res.status(200).json(professionalBusiness) 
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Error: " +error })
    }    
}