import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function user(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    const id = req.query.id as string
    switch (method) {

        // GET THE ITEM BY ID

        case "GET":
            try {
                if (id) {

                    const item = await prisma.product.findUnique({
                        where: {
                            id: id.toString()
                        },
                        include: {
                            user: true,
                        }
                    })
                    res.status(200).json(item)
                }
                else {
                    res.status(200).send("Item not found")
                }

            } catch (error) {
                console.log(error)
                res.status(400).json({ message: "Error: " + error })
            }
            break;

        // PUT(UPDATE) THE ITEM BY ID

        case "PUT":
            const data = req.body
            try {
                const item = await prisma.product.update({
                    where: {
                        id: id?.toString()
                    },
                    data
                })
                res.status(200).json(item)
            } catch (error) {
                console.log(error)
                res.status(400).json({ message: "Error: " + error })
            }
            break;

        // DELETE THE ITEM BY ID -> LOGIC DELETE

        case "DELETE":

            try {
                const item = await prisma.product.update({
                    where: {
                        id: id,
                    },
                    data: {
                        active: false,
                    },
                })
                res.status(200).json({ message: "Item " + item.name + " disabled" })
            } catch (error) {
                console.log(error)
                res.status(400).json({ message: "Error: " + error })
            }
            break;
        default:
            return res.status(400).json({ message: 'invalid method' })
    }
};


