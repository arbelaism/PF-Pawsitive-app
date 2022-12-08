import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function adoptionApply(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    switch (method) {

        // GET ALL ADOPTIONS APPLIES
        case "GET":
            try {
                const applies = await prisma.apply.findMany()
                if(applies){
                    applies.length > 0 ?
                    res.status(200).json(applies)
                    :
                    res.status(400).json({ message: "There are not applies." })
                }
            } catch (error) {
                console.log(error)
                res.status(404).json({ Error: error })
            }
            break;

        // POST(CREATE) ADOPTION APPLY
        case "POST":
            const { reason, past, residence, employee, garden, adoptionPostId, userId } = req.body;
            const userApplies = await prisma.apply.findMany({
                where: {
                    userId: userId
                }});
            if(userApplies.length>0){
                res.status(400).json({ message: "could not apply more than once" }) 
            }
            if(!reason || !past || !residence || !employee || !garden || !adoptionPostId || !userId){
                res.status(400).json({ message: "Missing values" }) 
            }   
            try {
                const newApply = await prisma.apply.create({
                    data: {
                        reason,
                        past,
                        residence,
                        employee,
                        garden,
                        adoptionPostId,
                        userId
                    }
                })
                newApply ?
                    res.status(200).send(newApply )
                    :
                    res.status(400).json({ message: "Could not apply" })

            } catch (error) {
                console.log(error)
                res.status(400).send(error)
            }
            break;
        default:
            return res.status(400).json({ message: 'invalid method' })
    }
};