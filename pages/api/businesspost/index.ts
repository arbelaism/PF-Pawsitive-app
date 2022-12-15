import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function user(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    switch (method) {

        // GET ALL THE PROFESSIONALS

        case "GET":
            try {
                const business = await prisma.businessPost.findMany()
                if (business.length > 0) {
                    res.status(200).json(business)
                } else {
                    res.status(401).json({ message: "no professionals found" })
                }
            } catch (error) {
                console.log(error)
                res.status(400).json({ message: "error " })
            }
            break;

        // POST(CREATE) THE PROFESSIONALS

        case "POST":
            const {
                name,
                contact,
                address,
                description,
                photo,
                type,
                active,
                userId,
            } = req.body;
            try {
                await prisma.businessPost.create({
                    data: {
                        name,
                        contact,
                        address,
                        description,
                        photo,
                        type,
                        active,
                        ownerBusinessId: userId,
                    },
                });
                res.status(200).json({ message: "created " });
            } catch (error) {
                console.log(error);
                res.status(400).json({ message: "error" });
            }
            break;
        default:
            return res.status(400).json({ message: 'invalid method' })
    }
};
