import axios from "axios";
import { AdoptFormInput, Product, ContactForm, CheckIn, IUserForm, Users, ReviewFormInput, Form, EmailT } from "app/types";
import { useQuery } from 'react-query';

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
  const res = products.filter((p: Product) => p.active === true)

  if (!products) throw new Error("Data not found");
  return res;
};
export const getProductById = async (id: string) => {
  const response = await axios.get("/api/product/" + id);
  const product = await response.data;

  if (!product) throw new Error("Data not found");
  return product;
};

export const getTransactionByUserId = async (id: string) => {
  const response = await axios.get("/api/transaction/" + id);
  const user = await response.data;

  if (!user) throw new Error("Data not found");
  return user;
};

export const getProductsByCategory = async (foodCategory: string) => {
  const response = await axios.get("/api/product/", {
    params: {
      categoria: foodCategory
    }
  });

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

export const sendMailT = async (data: EmailT) => {
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

// APIS PARA LA TABLA

export const getUsers = async () => {
  const response = await axios.get("/api/user");
  const users = await response.data;

  if (!users) {
    throw new Error("Data not found");
  }
  return users;
};

export const getAuth0Users = async () => {
    const response = await axios.get('/api/auth/users')
    const users = await response.data

    if (!users) {
        throw new Error('Data not found')
    }
    return users
}

export const getAuth0UserById = async (id: string) => {
    const response = await axios.get(`/api/auth/users/${id}`)
    const user = await response.data
    if (!user) throw new Error('Data not found')
    return user
}

export const putUsers = async (id: string, data: Object) => {

  const response = await axios.put(`/api/user/${id}`, data);

  if (!response) {
    throw new Error("Data not found");
  }
  return response;
};
export const putAdoption = async (id: string, data: Object) => {
  console.log('bd', id, data)

  const response = await axios.put(`/api/adoptionpost/${id}`, data);

  if (!response) {
    throw new Error("Data not found");
  }
  return response;
};

export const createUser = async (data: Users) => {
  console.log(data)
  const newUser = await axios
    .post('/api/user', data)
    .catch(error => console.log(error))
  return newUser
}
//  PRODUCTOS DE LA TABLA
export const getAllProducts = async () => {
  const response = await axios.get("/api/product");
  const products = await response.data;
  if (!products) throw new Error("Data not found");
  return products;
}

export const createProduct = async (data: Product) => {
  const newProduct = await axios
    .post('/api/product', data)
    .catch(error => console.log(error))
  return newProduct
}

export const putProduct = async (id: string, data: Object) => {
  const response = await axios.put(`/api/product/${id}`, data);
  if (!response) {
    throw new Error("Data not found");
  }
  return response;
};

// TRANSACCIONES DE LA TABLA

export const getAllTransactions = async () => {
  const response = await axios.get("/api/transaction");
  const transactions = await response.data;

  const res = transactions.map((e:any)=> { 
    return{...e ,  
      ['userFirstName'] : [e.user.firstName],
      ['userLastName'] : [e.user.lastName],
      ['userEmail'] : [e.user.email],
    }
  })


  if (!transactions) throw new Error("Data not found");
  return res;
}
export const createTransaction = async (data: Product) => {
  const newProduct = await axios
    .post('/api/transaction', data)
    .catch(error => console.log(error))
  return newProduct
}
export const putTransaction = async (id: string, data: Object) => {
  const response = await axios.put(`/api/transaction/${id}`, data);
  if (!response) {
    throw new Error("Data not found");
  }
  return response;
};

//SOLICITANTE DE LA ADOPCION
export const getAllApply = async () => {
  const response = await axios.get("/api/adoptionapply");
  const transactions = await response.data;

  const res = transactions.map((e:any)=> { 
    return{...e ,  
      ['userFirstName'] : [e.user.firstName],
      ['userLastName'] : [e.user.lastName],
      ['userEmail'] : [e.user.email],
      ['userPhone'] : [e.user.phone],
    }
  })
  if (!transactions) throw new Error("Data not found");
  return res;
}
export const createApply = async (data: Product) => {
  const newProduct = await axios
    .post('/api/adoptionapply', data)
    .catch(error => console.log(error))
  return newProduct
}
export const putApply= async (id: string, data: Object) => {
  const response = await axios.put(`/api/adoptionapply/${id}`, data);
  if (!response) {
    throw new Error("Data not found");
  }
  return response;
};
export const deleteApply= async (id: string, data: Object) => {
  const response = await axios.delete(`/api/adoptionapply/${id}`);
  if (!response) {
    throw new Error("Data not found");
  }
  return response;
};

//

export const registerUser = async (data: IUserForm) => {
  const newUser = await axios
    .post('/api/auth/register', data)
    .catch(error => console.log(error))
  return newUser
}


export const getUserById = async (id: string) => {
  const response = await axios.get(
    `/api/user/${id}`
  );
  const user = await response.data;
  if (!user) throw new Error("Data not found");
  return user;
};
export const useGetUserById = (id: any) => {
  return useQuery(['user', id], () => getUserById(id), { enabled: (typeof id === "string") })
};

export const apply = async (data: Form) => {
  const newApply = await axios
    .post('/api/adoptionapply', data)
    .catch(error => console.log(error))

  return newApply;
};
