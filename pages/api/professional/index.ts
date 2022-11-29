import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function user(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    switch (method) {

        // GET ALL THE PROFESSIONALS

        case "GET":
            try {
                const professionals = await prisma.professionalBusiness.findMany()
                if(professionals.length > 0) {
                    res.status(200).json(professionals)
                }else{
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
                businessName,
                contact,
                address,
                description,
                photo,
                dni,
                type,
                qualification,
                active,
                id,
            } = req.body;
            try {
                await prisma.professionalBusiness.create({
                    data: {
                        businessName,
                        contact,
                        address,
                        description,
                        photo,
                        dni,
                        type,
                        active,
                        qualification,
                        ownerBusinessId: id,
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
