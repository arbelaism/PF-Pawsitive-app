import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function adoptionApply(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    switch (method) {

        // GET ALL ADOPTIONS APPLIES
        case "GET":
            try {
                const applies = await prisma.apply.findMany({
                    select:{
                        id: true,
                        reason:true,
                        past:true,
                        employee:true,
                        garden:true,
                        createdAt:true,
                        updatedAt:true,
                        adoptionPostId:true,
                        userId:true,
                        user:{
                            select:{
                                firstName:true,
                                lastName:true,
                                email:true,
                                phone:true
                            }},
                        adoptionPost:{
                            select:{
                                name:true,
                                breed:true,
                                active:true,
                                photo:true,
                                user:{
                                    select:{
                                        id:true,
                                        firstName:true,
                                        lastName:true,
                                        email:true,
                                    }
                                }
                            }
                        }
                    }
                })
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
            const { 
                reason, 
                past, 
                residence, 
                employee, 
                garden, 
                adoptionPostId, 
                userId 
            } = req.body;
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
                let obj = {
                    reason: reason,
                    past: past,
                    residence: residence,
                    employee: employee,
                    garden: garden,
                    adoptionPostId: adoptionPostId,
                    userId: userId
                };
                if(typeof obj.past == 'string'){
                    if(obj.past=='true'){
                        obj.past = true;
                    }else{
                        obj.past = false;
                    };
                };
                if(typeof obj.employee == 'string'){
                    if(obj.employee=='true'){
                        obj.employee = true;
                    }else{
                        obj.employee = false;
                    };
                };
                if(typeof obj.garden == 'string'){
                    if(obj.garden=='true'){
                        obj.garden = true;
                    }else{
                        obj.garden = false;
                    };
                };

                const newApply = await prisma.apply.create({
                    data: {
                        reason,
                        past: obj.past,
                        residence,
                        employee: obj.employee,
                        garden: obj.garden,
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