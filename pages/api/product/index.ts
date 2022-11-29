import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function user(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    switch (method) {

        // GET ALL THE ITEMS

        case "GET":
            try {
                const Items = await prisma.product.findMany({
                    where: {
                        active: true,
                    },
                    include: {
                        user: true,
                    },
                });

                res.status(200).json(Items);
            } catch (error) {
                console.log(error);
                res.status(400).json({ message: "Error: " + error });
            }
            break;

        // POST(CREATE) THE ITEM

        case "POST":
            const {
                name,
                price,
                displayPrice,
                description,
                stock,
                photo,
                category,
                brand,
                size,
                active,
            } = req.body;
            try {
                await prisma.product.create({
                    data: {
                        name,
                        price,
                        displayPrice,
                        description,
                        stock,
                        photo,
                        category,
                        brand,
                        size,
                        active,
                    }
                })
                res.status(201).json({ message: "Item created" })
            } catch (error) {
                res.status(400).json({ message: "Error: " + error })
            }
            break;
        default:
            return res.status(400).json({ message: 'invalid method' })
    }
};
