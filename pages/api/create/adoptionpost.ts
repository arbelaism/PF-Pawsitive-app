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
            }else{
                res.status(401).json({ message:  "no enough data to create adoption Post : userId" })
            }
    } catch (error) {        
        res.status(400).json({ message: "Error: " + error })
    }    
}

