import axios from "axios";
import {useQuery} from 'react-query';
import { Props } from "pages/adoptions";

export const getAdoptions= async () => {
    const response = await axios.get('http://localhost:3000/api/adoptionpost');
    const adoptions = await response.data;

    if (!adoptions) {
        throw new Error('Data not found')
    }
    return adoptions;
};
//Custom hook to fetch data by id
const fetchPet = (id: any)=>{
    return axios.get(`http://localhost:3000/api/adoptionpost/${id}`);
};
//Data query by id
export const getPetById = (id: any)=>{
    return useQuery(['pet', id], ()=> fetchPet(id))
};
