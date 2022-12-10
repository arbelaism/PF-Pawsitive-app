import { NextApiRequest, NextApiResponse } from 'next'
import { IUserForm } from 'app/types'
import axios from 'axios'

const AUTH0_URL = process.env.AUTH0_ISSUER_BASE_URL
const CLIENT_ID = process.env.AUTH0_CLIENT_ID
const AUTH0_DB = process.env.AUTH0_DB_NAME

export default async function createUser(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {
        name,
        lastName,
        email,
        password,
        birthday,
        gender,
        nationality,
        role,
        active
    } = req.body

    console.log(nationality)
    try {
        const newUser = await axios
            .post(`${AUTH0_URL}/dbconnections/signup`, {
                clientId: CLIENT_ID,
                connection: AUTH0_DB,
                email: email,
                password: 'hola1234MASDK',
                username: 'testing',
                given_name: name,
                family_name: lastName,
                picture: 'http://example.org/jdoe.png',
                user_metadata: {
                    birthday: birthday,
                    nationality: nationality,
                    gender: gender,
                    role: role,
                    active: 'active'
                }
            })
            .catch(error => console.log(error))

        res.status(201).json(newUser)
    } catch (error) {
        res.status(404).json({ error: error })
    }
}
