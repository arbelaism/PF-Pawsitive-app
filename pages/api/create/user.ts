import { prisma } from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { email, name, lastName, age, photo, role, password } = req.body;
    try {
        const newUser = await prisma.user.create({
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
        newUser ?
            res.status(200).json({ message: "created" })
            :
            res.status(400).json({ message: "could not create user" })

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "error" })
    }

}

