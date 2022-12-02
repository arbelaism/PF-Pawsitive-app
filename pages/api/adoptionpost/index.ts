import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function user(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    switch (method) {

        // GET ALL THE ADOPTIONPOST

        case "GET":
            try {
                const posts = await prisma.adoptionPost.findMany({
                    where: {
                        active: true
                    },
                    select: {
                        id: true,
                        name: true,
                        size: true,
                        age: true,
                        breed: true,
                        photo: true,
                        active: true,
                        description: true,
                        createdAt: true,
                        user: {
                            select: {
                                firstName: true,
                                lastName: true,
                                email: true,
                            }
                        }
                    }
                })
                res.status(200).json(posts)
            } catch (error) {
                console.log(error)
                res.status(400).json({ message: "Error: " + error })
            }
            break;

        // POST(CREATE) THE ADOPTIONPOST

        case "POST":            
            const {
                name,
                age,
                breed,
                photo,
                active,
                description,
                userId
            } = req.body;
            const size = req.body.size.toUpperCase();
            try {
                if (userId) {
                    const newPost = await prisma.adoptionPost.create({
                        data: {
                            name,
                            size,
                            age,
                            breed,
                            photo,
                            active,
                            description,
                            userId
                        }
                    })
                    res.status(201).json(newPost)
                } else {
                    res.status(401).json({ message: "no enough data to create adoption Post : userId" })
                }
            } catch (error) {
                res.status(400).json({ message: "Error: " + error })
            }
            break;
        default:
            return res.status(400).json({ message: 'invalid method' })
    }
};
