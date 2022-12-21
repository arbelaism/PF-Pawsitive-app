import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from 'lib/prisma'

export default async function user(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req
    const { id } = req.query

    let userId: string = ''
    let productId: string = ''

    if (id && Array.isArray(id) && id.length === 1) {
        userId = id[0] as string
    }

    if (id && Array.isArray(id) && id.length === 2) {
        userId = id[0] as string
        productId = id[1] as string
    }

    switch (method) {
        case 'GET':
            try {
                const userBookmarks = await prisma.bookmark.findUnique({
                    where: {
                        userId: userId
                    },
                    include: {
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
                userBookmarks
                    ? res.status(200).json(userBookmarks)
                    : res.status(404).json({
                          message: `cant found the user with the id:${id} or not exist.`
                      })
            } catch (error) {
                console.log(error)
                res.status(404).json({
                    message: 'an error has occurred on the server'
                })
            }
            break
        case 'POST':
            if (!userId) throw new Error('Must provide a userId')

            try {
                const newBookmark = await prisma.bookmark.upsert({
                    where: {
                        userId: userId
                    },
                    update: {},
                    create: {
                        user: {
                            connect: { id: userId }
                        },
                        product: {}
                    }
                })

                newBookmark
                    ? res.status(201).json(newBookmark)
                    : res
                          .status(404)
                          .json({ message: 'error creating new user bookmark' })
            } catch (error) {
                console.log(error)
                res.status(400).json({ message: 'Error' })
            }
            break
        case 'PUT':
            // const data = req.body
            if (!productId) throw new Error('Must provide a productId')

            try {
                const bookmarks = await prisma.bookmark.update({
                    where: {
                        userId: userId
                    },
                    data: {
                        product: {
                            connect: { id: productId }
                        }
                    }
                })
                bookmarks
                    ? res.status(200).json({ message: 'Bookmark updated' })
                    : res
                          .status(400)
                          .json({ message: 'the user does not exist.' })
            } catch (error) {
                console.log(error)
                res.status(400).json({ message: 'Error' })
            }
            break

        case 'DELETE':
            const productsId = req.body
            try {
                if (!productId && !productsId)
                    throw new Error('Must provide a productId')

                const bookmark = await prisma.bookmark.update({
                    where: {
                        userId: userId
                    },
                    data: {
                        product: {
                            deleteMany: {
                                id: {
                                    in: productsId || productId
                                }
                            }
                        }
                    }
                })
                bookmark
                    ? res.status(200).json({ message: 'bookmark deleted' })
                    : res.status(400).json({
                          message: 'error deleting the bookmark'
                      })
            } catch (error) {
                console.log(error)
                res.status(400).json({ message: 'Error in bookmarks' })
            }
            break
        default:
            return res.status(400).json({ message: 'invalid method' })
    }
}
