// import { Action, IAdoption } from '../../types'
// import { FETCH_ADOPTIONS } from '../constants'
import axios from 'axios'

const fetchAdoptions = async (): Promise<[]> => {
    const response = await axios.get(
        'http://localhost:3000/api/read/adoptionposts/all'
    )

    return response.data
}

export default fetchAdoptions

// FIX: ! needs work

// export const fetchAdoptions = (): Action => {
//     let adoptions: IAdoption[] = []

//     axios.get('/api/read/adoptionposts/all').then(response => {
//         adoptions.push(...response.data)
//     })

//     return {
//         type: FETCH_ADOPTIONS,
//         payload: adoptions
//     }
// }
