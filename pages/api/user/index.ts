import { randomUUID } from 'crypto'
import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

export default async function user(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req
    switch (method) {
        // GET ALL THE USER

        case 'GET':
            try {
                const users = await prisma.user.findMany({
                    include: {
                        businessPost: true
                    }
                })
                users
                    ? res.status(200).json(users)
                    : res.status(400).json({ message: 'users dont found.' })
            } catch (error) {
                console.log(error)
                res.status(404).json({
                    message: 'an error occurred in the database.'
                })
            }
            break

        // POST(CREATE) THE USER

        case 'POST':
            const {
                id,
                firstName,
                lastName,
                email,
                email_verified,
                gender,
                birthday,
                address,
                phone,
                city,
                province,
                country,
                postCode,
                photo,
                role,
                active
            } = req.body

            try {
                const newUser = await prisma.user.upsert({
                    where: { id: id },
                    update: {
                        firstName,
                        lastName,
                        email,
                        email_verified,
                        photo
                    },
                    create: {
                        id: id || randomUUID(),
                        firstName,
                        lastName,
                        email,
                        email_verified,
                        gender,
                        birthday,
                        address,
                        phone,
                        city,
                        province,
                        country,
                        postCode,
                        photo,
                        role,
                        active
                    }
                })
                newUser
                    ? res.status(200).json({ message: 'created' })
                    : res.status(400).json({ message: 'could not create user' })
            } catch (error) {
                console.log(error)
                res.status(400).json({ message: 'Error' })
            }
            break
        default:
            return res.status(400).json({ message: 'invalid method' })
    }
}
