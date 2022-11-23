import { prisma } from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { businessName, contact, address, description, photo, dni, type, qualification, ownerBusinessId  } = req.body;
    try {
        await prisma.professionalBusiness.create({
            data: {
                businessName,
                contact,
                address,
                description,
                photo,
                dni,
                type,
                qualification,
                ownerBusinessId,  
            }
        })

        res.status(200).json({ message: "created " })
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "error" })
    }

}