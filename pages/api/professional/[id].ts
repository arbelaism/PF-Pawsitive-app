import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function user(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    const id = req.query.id as string
    switch (method) {

        // GET THE PROFESSIONALS BY ID

        case "GET":
            try {
                const professional = await prisma.professionalBusiness.findUnique({
                    where: {
                        id: String(id),
                    },
                });
                if (professional) res.status(200).json(professional);
                else
                    return res
                        .status(401)
                        .json({ message: `cant found an object with id ${id}` });
            } catch (error) {
                console.log(error);
            }
            break;

        // PUT(UPDATE) THE PROFESSIONALS BY ID

        case "PUT":
            const data = req.body
            try {
                const professionalBusiness = await prisma.professionalBusiness.update({
                    where: {
                        id: id?.toString()
                    },
                    data
                })
                res.status(200).json(professionalBusiness)
            } catch (error) {
                console.log(error)
                res.status(400).json({ message: "Error: " + error })
            }
            break;

        // DELETE THE PROFESSIONALS BY ID -> LOGIC DELETE

        case "DELETE":
            try {
                const professional = await prisma.professionalBusiness.update({
                    where: { id: String(id) },
                    data: {
                        active: false,
                    },
                });
                professional
                    ? res.status(200).json({ message: "professional logic delete" })
                    : res.status(400).json({
                        message: "the professional does not exist in the database.",
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


