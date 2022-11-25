import { prisma } from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export interface Post {
    name: string
    size: string
    age: string
    breed: string
    photo: string
    active: boolean
    userAdopId: string
  }

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { name, age, breed, photo, active, userAdopId }:Post = req.body;
    const size = req.body.size.toUpperCase();
    try {
            if(userAdopId){
                const newPost = await prisma.adoptionPost.create({
                    data: {
                        name,
                        size,
                        age,
                        breed,
                        photo,
                        active,
                        userAdopId
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

