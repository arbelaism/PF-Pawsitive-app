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
    name: string;
    size: string;
    age: string;
    active? : boolean,
    description?: string,
    monthOrYear: string;
    breed: string;
    photo?: string;
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

export interface IAppContext {
    users: []
    adoptions: IAdoption[] | []
}

export interface Action {
    type: string
    payload: IAdoption[] | []
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export interface CheckIn {
  name: string;
  email: string;
  products: Product[];
  total: string;
  action: string
}
export interface Transaction {
  id:        string;
  amount:    number;
  createdAt: string;
  updatedAt: string;
  userId:    string;
  status:    string;
  user:      UserT;
  quantity:  Quantity[];
}

export interface Quantity {
  quantity: number;
  product:  Product;
}

export interface Product {
  id:           string;
  name:         string;
  displayPrice: number;
  category:     string;
}

export interface UserT {
  firstName: string;
  lastName:  string;
  email:     string;
  photo:     string;
}
