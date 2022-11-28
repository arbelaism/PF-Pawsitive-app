export enum Size {
    SMALL = 'SMALL',
    MEDIUM = 'MEDIUM',
    BIG = 'BIG'
}

export type User = {
    name: string
    lastName: string
    email: string
}

export interface IAdoption {
    id: string
    name: string
    size: Size
    age: string
    breed: string
    photo: string
    active?: boolean
    userAdop: User
}

export interface IAppContext {
    users: []
    adoptions: IAdoption[] | []
}

export interface Action {
    type: string
    payload: IAdoption[] | []
}
