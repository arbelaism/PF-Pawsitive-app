import { prisma } from "../../../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const id = req.query.id
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: String(id),
            },
            include: {
                adoptionPost: true,
                professionalBusiness: true,
                item: true
            }
        })
        user ?
            res.status(200).json(user)
            :
            res.status(404).json({ message: `cant found the user with the id:${id} or not exist.` })

    } catch (error) {
        console.log(error)
        res.status(404).json({ message: "an error has occurred on the server" })
    }
}