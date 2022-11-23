import { prisma } from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getPosts(req: NextApiRequest, res: NextApiResponse) {
    
    try {
        const posts = await prisma.adoptionPost.findMany({
            where:{
                active:true
            },
            select:{
                name: true,
                size: true,
                age: true,
                breed: true,
                photo: true                
            }
        })
        res.status(200).json(posts)
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Error: " +error })
    }    
}