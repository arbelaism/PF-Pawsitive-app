import { prisma } from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    try {
        const users = await prisma.user.findMany({
            include: {
                profesionalBusiness: true,
            }
        })
        res.status(200).json(users)
    } catch (error) {
        console.log(error)
        res.status(404).json({ message: "Users dont found." })
    }
}

