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
    monthOrYear?: string
    breed: string
    photo?: string
    userId: string

  }
  export interface ReviewFormInput {
    review: string
    rating : number
    userId?: string
    productId: string
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
    createdAt: string
    updatedAt: string
    active?: boolean
    user: UserProduct
    amount?: number
    review : Review[]
  }
  export interface Review {
    id: string
    rating: number
    review: string
    createdAt: Date
    updatedAt: Date
    user?: UserReview
    userId?: string | null   
    productId?: string | null
  }
  export interface UserReview {
    firstName : string
    lastName : string
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

export interface EmailT {
  name: string
  email: string
  status: string
  idT: any
  message: string
  action: string
}

export enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER'
}


export interface CheckIn {
  name: string;
  idT: any;
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


export interface Users {
  id:           string;
  firstName:    string;
  lastName:     string;
  email:        string;
  gender:       string;
  birthday:     string;
  address:      string;
  phone:        string;
  city:         string;
  province:     string;
  country:      string;
  postCode:     string;
  photo:        string;
  role:         string;
  active:       boolean;
  createdAt:    string;
  updatedAt:    string;
  businessPost?: BusinessPost[];
}

export interface BusinessPost {
  id:              string;
  name:            string;
  contact:         string;
  address:         string;
  description:     string;
  photo:           string;
  type:            string;
  active:          boolean;
  ownerBusinessId: string;
}




export interface Adoptions {
  id:          string;
  name:        string;
  size:        Size;
  age:         string;
  breed:       string;
  gender:       string;
  photo:       string;
  active:      boolean;
  description: string;
  createdAt:   string;
  updatedAt:   string;
  user:        User2;
}

export enum Size {
  Big = "BIG",
  Medium = "MEDIUM",
  Small = "SMALL",
}

export interface User2 {
  firstName: string;
  lastName:  string;
  email:     string;
  city:       string;
  province:   string;
  country:    string;
  address:    string;
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

export interface Apply{
  petId: string;
  userId: string
}
export interface Form{
  reason: string,
  past: string,
  residence: string,
  employee: string,
  garden: string,
  adoptionPostId: string,
  userId: string
}


export interface TransactionT {
  id:        string;
  amount:    number;
  createdAt: string;
  updatedAt: string;
  userId:    string;
  status:    Status;
  user:      UserT;
  quantity:  Quantity[];
}

export interface Quantity {
  id:       string;
  quantity: number;
  product:  Product;
}

export interface Product {
  id:           string;
  name:         string;
  price:        number;
  displayPrice: number;
  category:     string;
}

export enum Status {
  REFUND = "REFUND",
  INCOMPLETE_PAYMENT = "INCOMPLETE_PAYMENT ",
  PROCESSING_PAYMENT = "PROCESSING_PAYMENT",
  PROCESSING_SHIPPING = "PROCESSING_SHIPPING",
  SHIPPING = "SHIPPING",
  PAYMENT_COMPLETE = "PAYMENT_COMPLETE",
}

export interface UserT {
  id:        string;
  firstName: string;
  lastName:  string;
  email:     string;
  birthday:  Birthday;
  active:    boolean;
  role:      Role;
}

export enum Birthday {
  The05011980 = "05/01/1980",
  The23042000 = "23/04/2000",
  The23111977 = "23/11/1977",
  The30041993 = "30/04/1993",
}

export enum Role {
  Basic = "BASIC",
}

// Generated by https://quicktype.io

export interface Aplies {
  id:             string;
  reason:         string;
  past:           boolean;
  employee:       boolean;
  garden:         boolean;
  createdAt:      string;
  updatedAt:      string;
  adoptionPostId: string;
  userFirstName: string;
  userLastName: string;
  userEmail: string;
  userPhone: string;
  userId:         string;
  user:           UserApply;
  adoptionPost:   AdoptionPost;
}

export interface AdoptionPost {
  name:   string;
  breed:  string;
  gender: string;
  active: boolean;
  photo:  string;
  user:   UserT;
}

export interface UserApply {
  id?:       string;
  firstName: string;
  lastName:  string;
  email:     string;
}


// Generated by https://quicktype.io

export interface MyTransaction {
  id:        string;
  amount:    number;
  createdAt: string;
  updatedAt: string;
  userId:    string;
  status:    string;
  quantity:  Quantity[];
}

export interface Quantity {
  quantity: number;
  product:  Product;
}

export interface Product {
  id:           string;
  name:         string;
  category:     string;
  brand:        string;
  displayPrice: number;
}
