import { prisma } from "../../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const users = await prisma.user.findMany({
            include: {
                professionalBusiness: true,
            }
        })
        users ?
            res.status(200).json(users)
            :
            res.status(400).json({ message: "users dont found." })

    } catch (error) {
        console.log(error)
        res.status(404).json({ message: "an error occurred in the database." })
    }
}

