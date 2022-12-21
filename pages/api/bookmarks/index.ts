import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from 'lib/prisma'

export default async function bookmark(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method } = req
    const { id } = req.body

    let userId: string = ''

    if (id && Array.isArray(id) && id.length === 1) {
        userId = id[0] as string
    }

    switch (method) {
        case 'GET':
            try {
                const bookmarks = await prisma.bookmark.findMany({
                    include: {
                        user: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true,
                                email: true
                            }
                        },
                        product: {
                            select: {
                                id: true,
                                name: true,
                                displayPrice: true,
                                photo: true,
                                brand: true
                            }
                        }
                    }
                })

                bookmarks
                    ? res.status(200).json(bookmarks)
                    : res.status(400).json({ message: 'bookmarks not found' })
            } catch (error) {
                console.log(error)
                res.status(404).json({
                    message: 'an error ocurred fetching the bookmarks'
                })
            }
            break
        default:
            return res.status(400).json({ message: 'invalid method' })
    }
}
