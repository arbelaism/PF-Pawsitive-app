import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function user(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    const id = req.query.id as string
    switch (method) {

        // DELETE THE ADOPTIONPOST BY ID -> LOGIC DELETE

        case "DELETE":
            try {
                const post = await prisma.apply.delete({
                    where: { id: String(id) },
                                });
                post
                    ? res.status(200).json({ message: "Apply deleted" })
                    : res.status(400).json({
                        message: "the apply post does not exist in the database.",
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


