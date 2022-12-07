import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function user(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    const id = req.query.id as string
    switch (method) {

        // GET THE TRANSACTION BY ID

        case "GET":
            try {
                const userTransactions = await prisma.transaction.findMany({
                    where: {
                        userId: id
                    },
                    include: {
                        quantity: {
                            select: {
                                quantity: true,
                                product: {
                                    select: {
                                        name: true,
                                        category: true,
                                        brand: true,
                                        displayPrice: true,

                                    }
                                }
                            }
                        }
                    }
                })

                userTransactions ?
                    res.status(200).json(userTransactions)
                    :
                    res.status(404).json({ message: `cant found the user with the id:${id} or not exist.` })

            } catch (error) {
                console.log(error)
                res.status(404).json({ message: "an error has occurred on the server" })
            }
            break;

        // PUT(UPDATE) THE TRANSACTION BY ID

        case "PUT":
            const { status } = req.body
            try {
                const transactionUpdated = await prisma.transaction.update({
                    where: {
                        id: id
                    },
                    data: { status }
                })
                transactionUpdated ?
                    res.status(200).json({ message: "Updated" })
                    :
                    res.status(400).json({ message: "the user does not exist." })

            } catch (error) {
                console.log(error)
                res.status(400).json({ message: "Error" })
            }
            break;

        default:
            return res.status(400).json({ message: 'invalid method' })
    }
};


