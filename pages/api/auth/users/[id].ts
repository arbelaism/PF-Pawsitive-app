import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

const URL = process.env.AUTH0_ISSUER_BASE_URL
const TOKEN = process.env.AUTH0_API_TOKEN
const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID
const AUTH0_DB = process.env.AUTH0_DB_NAME

export default async function auth0User(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method } = req
    const id = req.query.id as string
    switch (method) {
        case 'PATCH':
            const { name, lastName, username, email, password, photo } =
                req.body
            try {
                const options = {
                    method: 'PATCH',
                    url: `${URL}/api/v2/users/${id}`,
                    data: {
                        connection: AUTH0_DB,
                        client_id: AUTH0_CLIENT_ID,
                        email: email,
                        name: `${name} ${lastName}`,
                        username: username,
                        password: password,
                        picture: photo
                    },
                    headers: { authorization: `Bearer ${TOKEN}` }
                }

                const response = await axios.request(options)
                const user = await response.data

                user
                    ? res.status(200).json(user)
                    : res
                          .status(404)
                          .json({ message: 'Error modificando el usuario' })
            } catch (error) {
                console.log(error)
                res.status(400).json({ message: 'Error patch auth0' })
            }
            break
        case 'DELETE':
            const options = {
                method: 'DELETE',
                url: `${URL}/api/v2/users/${id}`,
                headers: { authorization: `Bearer ${TOKEN}` }
            }

            const response = await axios.request(options)
            const userDeleted = await response.data

            res.status(204).json({ message: 'OK' })
            break
        default:
            return res.status(400).json({ message: 'invalid method' })
    }
}
