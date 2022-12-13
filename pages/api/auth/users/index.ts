import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

const URL = process.env.AUTH0_ISSUER_BASE_URL
const TOKEN = process.env.AUTH0_API_TOKEN
const AUTH0_DB = process.env.AUTH0_DB_NAME

export default async function auth0Users(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method } = req

    switch (method) {
        case 'GET':
            try {
                const options = {
                    method: 'GET',
                    url: `${URL}/api/v2/users`,
                    headers: { authorization: `Bearer ${TOKEN}` }
                }

                const response = await axios.request(options)
                const users = await response.data

                if (!users) throw new Error('Error en la request')

                const usersData = users.map((u: any) => {
                    return {
                        id: u.user_id,
                        email: u.email,
                        email_verified: u.email_verified,
                        username: u.username,
                        photo: u.picture,
                        createdAt: u.created_at,
                        updatedAt: u.updated_at
                    }
                })

                res.json(usersData)
            } catch (error) {
                console.log(error)
                res.status(404).json({
                    message: 'error trying to retrieve auth0 users'
                })
            }
            break
        case 'POST':
            const { name, lastName, username, email, password, photo } =
                req.body

            try {
                const options = {
                    method: 'POST',
                    url: `${URL}/api/v2/users`,
                    data: {
                        connection: AUTH0_DB,
                        email: email,
                        name: `${name} ${lastName}`,
                        username: username,
                        password: password,
                        picture: photo,
                        email_verified: false
                    },
                    headers: { authorization: `Bearer ${TOKEN}` }
                }

                const response = await axios.request(options)
                const newUser = await response.data

                newUser
                    ? res.status(201).json(newUser)
                    : res
                          .status(400)
                          .json({ message: 'could not create the user' })
            } catch (error) {
                console.log(error)
                res.status(404).json({
                    message: 'error trying to create auth0 user'
                })
            }
            break
        default:
            return res.status(400).json({ message: 'Invalid method' })
    }
}
