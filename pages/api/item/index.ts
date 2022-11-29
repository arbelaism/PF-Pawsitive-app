import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function user(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    switch (method) {

        // GET ALL THE ITEMS

        case "GET":
            try {
                const Items = await prisma.item.findMany({
                  where: {
                    active: true,
                  },
                  include: {
                    professionalBusiness: true,
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
            const { name, price, description, amount, photo, active, userId } = req.body;
            try {
                if(!userId){
        
                    await prisma.item.create({
                        data: {
                            name,
                            price,
                            description,
                            amount,
                            photo,
                            active
                        }
                    })
                }
                else{
                    const professional = await prisma.professionalBusiness.findFirst({
                        where : {
                            ownerBusiness : {
                                is : {
                                    id : userId
                                }
                            }
                        },
                        select : {
                            id : true,
                        }
                    })
        
                    await prisma.item.create({
                        data: {
                            name,
                            price,
                            description,
                            amount,
                            photo,
                            active,
                            user: {
                                connect: [{id: userId}]
                            },
                            professionalBusiness : {
                                connect : [{id: professional?.id}]
                            }
                        }
                    })
                }
                res.status(201).json({ message: "Item created" })
            } catch (error) {        
                res.status(400).json({ message: "Error: " +error })
            }
            break;
        default:
            return res.status(400).json({ message: 'invalid method' })
    }
};
