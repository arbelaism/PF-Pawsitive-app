import { prisma } from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { name, age, breed, photo, active, userId } = req.body;
    const size = req.body.size.toUpperCase();
    try {
            if(userId){

                const newPost = await prisma.adoptionPost.create({
                    data: {
                        name,
                        size,
                        age,
                        breed,
                        photo,
                        active,
                        userAdopId: userId
                    }
                })
                res.status(201).json(newPost)
            }
            else{
                const newPost = await prisma.adoptionPost.create({
                    data: {
                        name,
                        size,
                        age,
                        breed,
                        photo,
                        active                        
                    }
                })
                res.status(201).json(newPost)
            }
    } catch (error) {        
        res.status(400).json({ message: "Error: " +error })
    }    
}