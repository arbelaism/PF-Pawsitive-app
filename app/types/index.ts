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

export interface AdoptFormInput {
    name: string
    size: string
    age: string
    active?: boolean
    description?: string
    monthOrYear: string
    breed: string
    photo?: string
    userId: string
}

export interface Product {
    key?: string
    id: string
    name: string
    price: number
    displayPrice: number
    description: string
    stock: number
    photo: string
    category: string
    brand: string
    size: string
    active?: boolean
    user: UserProduct
    amount?: number
}

export interface UserProduct {
    id: string
    firstName: string
    lastName: string
    email: string
    age?: number
    photo?: string
    role?: string
    active?: boolean
    password?: string
}

export interface ContactForm {
    name: string
    email: string
    message: string
}

export interface CheckIn {
    name: string
    email: string
    products: Product[]
    total: string
    action: string
}

export enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER'
}

export interface IUser {
    name: string
    lastName: string
    email: string
    birthday: string
    gender: string
    nationality: string
    role: string
    active: boolean
}

export interface IUserForm extends IUser {
    password: string
    confirmPassword: string
}
