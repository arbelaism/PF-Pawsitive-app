import { prisma } from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { name, lastName, email, age, role, password } = req.body;
    try {
        await prisma.user.create({
            data: {
                name,
                lastName,
                email,
                age,
                role,
                password
            }
        })
        res.status(200).json({ message: "created" })
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "error" })
    }

}

