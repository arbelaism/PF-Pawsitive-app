import { prisma } from "../../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const id = req.query.id
    const { email, name, lastName, age, photo, role, password } = req.body
    try {
        const user = await prisma.user.update({
            where: { id: String(id) },
            data: {
                email,
                name,
                lastName,
                age,
                photo,
                role,
                password,
            }
        })
        user ?
            res.status(200).json({ message: "Updated" })
            :
            res.status(400).json({ message: "the user does not exist." })

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Error" })
    }
}