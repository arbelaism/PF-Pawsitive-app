import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function user(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    const id = req.query.id as string
    switch (method) {

        case "GET":
            try {
                const review = await prisma.apply.findUnique({
                    where: {
                        userId: id as string
                    },
                    include: {
                        adoptionPost: true,
                        user: true
                    }
                })
                review ?
                    res.status(200).json(review)
                    :
                    res.status(404).json({ message: `cant found the user with the id:${id} or not exist.` })

            } catch (error) {
                console.log(error)
                res.status(404).json({ message: "an error has occurred on the server" })
            }
            break
        // PUT(UPDATE) THE USER BY ID

        case "PUT":
            const {
                firstName,
                lastName,
                email,
                gender,
                birthday,
                address,
                phone,
                city,
                province,
                postCode,
                photo,
                role,
                active
            } = req.body
            try {
                const user = await prisma.user.update({
                    where: { id: String(id) },
                    data: {
                        firstName,
                        lastName,
                        email,
                        gender,
                        birthday,
                        address,
                        phone,
                        city,
                        province,
                        postCode,
                        photo,
                        role,
                        active
                    }
                })
                user ?
                    res.status(200).json({ message: "Updated" })
                    :
                    res.status(400).json({ message: "the user does not exist." })

            } catch (error) {
                console.log(error)
                res.status(400).json({ message: "Error" })
            }
            break;

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


