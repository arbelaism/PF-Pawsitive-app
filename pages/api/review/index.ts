import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function user(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    switch (method) {

        // GET ALL THE REVIEWS

        case "GET":
            try {
                const reviews = await prisma.review.findMany({
                    include: {
                        user: {
                            select: {
                                firstName: true,
                                lastName: true,
                                email: true,
                            },
                        }
                    }
                })
                reviews ?
                    res.status(200).json(reviews)
                    :
                    res.status(400).json({ message: "reviews dont found." })

            } catch (error) {
                console.log(error)
                res.status(404).json({ message: "an error occurred in the database." })
            }
            break;

        // POST(CREATE) THE REVIEW

        case "POST":
            const { rating, review, productId, userId } = req.body;
            try {
                const newReview = await prisma.review.create({
                    data: {
                        rating,
                        review,
                        productId,
                        userId
                    }
                })
                newReview ?
                    res.status(200).json({ message: "created" })
                    :
                    res.status(400).json({ message: "could not create review" })

            } catch (error) {
                res.status(400).json({ message: "Error" })
            }
            break;
        default:
            return res.status(400).json({ message: 'invalid method' })
    }
};
