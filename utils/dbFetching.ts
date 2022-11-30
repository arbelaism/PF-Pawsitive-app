import axios from "axios";

export const getAdoptions= async () => {
    const response = await axios.get('http://localhost:3000/api/adoptionpost');
    const adoptions = await response.data;

    if (!adoptions) {
        throw new Error('Data not found')
    }
    return adoptions;
}

export const getProducts = async ()=>{
    const response = await axios.get('http://localhost:3000/api/product')
    const products = await response.data;

    if(!products) throw new Error('Data not found')
    return products;
}
