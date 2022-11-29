import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function user(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    const id = req.query.id as string
    switch (method) {

        // GET THE ADOPTIONPOST BY ID

        case "GET":
            try {
                if (id) {
                    const post = await prisma.adoptionPost.findUnique({
                        where: {
                            id: String(id),
                        },
                    });
                    if (post) res.status(200).json(post);
                    else
                        return res
                            .status(401)
                            .json({ message: `cant match results for type ${id}` });
                }
            } catch (error) {
                console.log(error);
            }
            break;

        // PUT(UPDATE) THE ADOPTIONPOST BY ID

        case "PUT":
            const data = req.body
            try {
                const post = await prisma.adoptionPost.update({
                    where: {
                        id: id?.toString()
                    },
                    data
                })
                res.status(200).json(post)
            } catch (error) {
                console.log(error)
                res.status(400).json({ message: "Error: " + error })
            }
            break;
        // DELETE THE ADOPTIONPOST BY ID -> LOGIC DELETE

        case "DELETE":
            try {
                const post = await prisma.adoptionPost.update({
                    where: { id: String(id) },
                    data: {
                        active: false,
                    },
                });
                post
                    ? res.status(200).json({ message: "adoption post logic delete" })
                    : res.status(400).json({
                        message: "the adoption post does not exist in the database.",
                    });
            } catch (error) {
                console.log(error);
                res.status(400).json({ message: "Error" });
            }
            break;
        default:
            return res.status(400).json({ message: 'invalid method' })
    }
};


