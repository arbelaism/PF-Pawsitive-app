import { getUserById } from './dbFetching'

export const getEmail = async (userId: string): Promise<string> => {
    const user = await getUserById(userId)

    return user.email
}
