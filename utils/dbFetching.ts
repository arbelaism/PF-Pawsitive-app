import axios from "axios";
import { AdoptFormInput, ContactForm, CheckIn, IUserForm,Users, ReviewFormInput } from "app/types";

export const getAdoptions = async () => {
  const response = await axios.get("/api/adoptionpost");
  const adoptions = await response.data;

  if (!adoptions) {
    throw new Error("Data not found");
  }
  return adoptions;
};

export const getMinAdoptions = async () => {
  const response = await axios.get("/api/adoptionpost/age/min");
  const adoptions = await response.data;

  if (!adoptions) {
    throw new Error("Data not found");
  }
  return adoptions;
};

export const getProducts = async () => {
  const response = await axios.get("/api/product");
  const products = await response.data;

  if (!products) throw new Error("Data not found");
  return products;
};
export const getProductById = async (id: string) => {
  const response = await axios.get("/api/product/" + id);
  const product = await response.data;

  if (!product) throw new Error("Data not found");
  return product;
};

export const getTransactionByUserId = async (id: string) => {
  const response = await axios.get("/api/transaction/"+id);
  const user = await response.data;

  if (!user) throw new Error("Data not found");
  return user;
};

export const getProductsByCategory = async (foodCategory: string) => {  
  const response = await axios.get("/api/product/", { params:{
    categoria : foodCategory
  } } );

  const products = await response.data;

  if (!products) throw new Error("Data not found");
  return products;
};

export const getPetById = async (id: string) => {
  const response = await axios.get(
    `/api/adoptionpost/${id}`
  );
  const products = await response.data;
  if (!products) throw new Error("Data not found");
  return products;
};

export const createPost = async (data: AdoptFormInput) => {
  const newPost = await axios
    .post("/api/adoptionpost", data)
    .then((response) => response.data.name)
    .catch((error) => console.log(error));

  return "Post de " + newPost + " creado";
};
export const createReview = async (data: ReviewFormInput) => {
  const newReview = await axios
    .post("/api/review", data)
    .then((response) => response.data.id)
    .catch((error) => console.log(error));

  return "Review de " + newReview + " creado";
};

export const sendMail = async (data: ContactForm) => {
  const newPost = await axios
    .post("/api/sendMail", data)
    .catch((error) => console.log(error));

  return "email send";
};

export const sendPaymentMail = async (data: CheckIn) => {
  const newPost = await axios
    .post("/api/sendMail", data)
    .catch((error) => console.log(error));

  return "email send";
};


export const getTransactions = async () => {
  const response = await axios.get("/api/transaction");
  const transaction = await response.data;

  if (!transaction) {
    throw new Error("Data not found");
  }
  return transaction;
};

export const getUsers = async () => {
  const response = await axios.get("/api/user");
  const users = await response.data;

  if (!users) {
    throw new Error("Data not found");
  }
  return users;
};
export const putUsers = async (id: string, data: Object) => {
  console.log('bd',id,data)
 
  const response = await axios.put(`/api/user/${id}`, data);

  if (!response) { 
    throw new Error("Data not found");
  }
  return response;
};

export const registerUser = async (data: IUserForm) => {
    const newUser = await axios
        .post('/api/auth/register', data)
        .catch(error => console.log(error))
    return newUser
}

