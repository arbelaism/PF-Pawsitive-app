import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function user(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    const id = req.query.id as string
    switch (method) {

        // GET THE USER BY ID

        case "GET":
            try {
                const reviews = await prisma.review.findMany({
                    where: { productId: id },
                    include: {
                        user: {
                            select: {
                                firstName: true,
                                lastName: true,
                                email: true,
                                photo: true
                            }
                        }
                    }
                })
                reviews ?
                    res.status(200).json(reviews)
                    :
                    res.status(404).json({ message: `cant found the user with the id:${id} or not exist.` })

            } catch (error) {
                console.log(error)
                res.status(404).json({ message: "an error has occurred on the server" })
            }
            break;

        // PUT(UPDATE) THE USER BY ID
        //El ID que usa es el de la ""review"" no del usuario
        case "PUT":
            const { review, rating } = req.body
            try {
                const reviews = await prisma.review.update({
                    where: { id },
                    data: {
                        review,
                        rating
                    }

                })

                reviews ?
                    res.status(200).json({ message: "Updated" })
                    :
                    res.status(400).json({ message: "the user does not exist." })

            } catch (error) {
                console.log(error)
                res.status(400).json({ message: "Error" })
            }
            break;

        // DELETE THE USER BY ID -> LOGIC DELETE

        case "DELETE":
            try {
                const reviewDeleted = await prisma.review.delete({
                    where: { id }
                })
                reviewDeleted ?
                    res.status(200).json({ message: "delete the review" })
                    :
                    res.status(400).json({ message: "the user does not exist in the database." })

            } catch (error) {
                console.log(error)
                res.status(400).json({ message: "Error" })
            }
            break;
        default:
            return res.status(400).json({ message: 'invalid method' })
    }
};


