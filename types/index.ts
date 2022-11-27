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

//FIX: ! Si acá agregamos a cada adoptions el type IAdoption (sin el [])
// pasa en actions pero no deja mapear en adoptions porque no es un array.

export interface Action {
    type: string
    payload: IAdoption[] | []
}
