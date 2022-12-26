import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

export default async function user(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req
    switch (method) {
        // GET ALL THE TRANSACTIONS

        case 'GET':
            try {
                const transactions = await prisma.transaction.findMany({
                    include: {
                        user: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true,
                                email: true,
                                birthday: true,
                                active: true,
                                role: true
                            }
                        },
                        quantity: {
                            select: {
                                id: true,
                                quantity: true,
                                product: {
                                    select: {
                                        id: true,
                                        name: true,
                                        price: true,
                                        displayPrice: true,
                                        category: true
                                    }
                                }
                            }
                        }
                    }
                })
                transactions
                    ? res.status(200).json(transactions)
                    : res
                          .status(400)
                          .json({ message: 'transactions dont found.' })
            } catch (error) {
                console.log(error)
                res.status(404).json({
                    message: 'an error occurred in the database.'
                })
            }
            break

        // POST(CREATE) THE TRANSACTION

        case 'POST':
            const { amount, userId, status, quantity } = req.body
            /*
            Formato del array
            array=[
                {
                    quantity:2,         --> cantidad del producto 
                    productId:"algo"    --> id del producto
                },
                {
                    quantity:2,         --> cantidad del producto 
                    productId:"algo"    --> id del producto
                },
                {
                    quantity:2,         --> cantidad del producto 
                    productId:"algo"    --> id del producto
                }
            ]
            */

            console.log(req.body)

            try {
                const newTransaction = await prisma.transaction.create({
                    data: {
                        amount,
                        userId,
                        status,
                        quantity: {
                            create: quantity
                        }
                    }
                })
                newTransaction
                    ? res.status(200).json(newTransaction)
                    : res
                          .status(400)
                          .json({ message: 'could not create transaction' })
            } catch (error) {
                res.status(400).json(error)
            }
            break
        default:
            return res.status(400).json({ message: 'invalid method' })
    }
}
