import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { AdoptFormInput } from "app/types";
import { Props } from "pages/adoptions";

export const getAdoptions = async () => {
  const response = await axios.get("/api/adoptionpost");
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

