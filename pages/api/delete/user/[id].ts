import { prisma } from "../../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const id = req.query.id
    try {
        const user = await prisma.user.update({
            where: { id: String(id) },
            data: {
                role: "INACTIVE",
            }
        })
        user ?
            res.status(200).json({ message: "user logic delete" })
            :
            res.status(400).json({ message: "the user does not exist in the database." })

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Error" })
    }
}