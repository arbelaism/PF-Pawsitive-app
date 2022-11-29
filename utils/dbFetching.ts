import axios from "axios";

export const getAdoptions= async () => {
    const response = await axios.get('http://localhost:3000/api/read/adoptionposts/all');
    const adoptions = await response.data;

    if (!adoptions) {
        throw new Error('Data not found')
    }
    return adoptions;
}