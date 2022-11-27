import { Action, IAdoption } from '../../types'
import { FETCH_ADOPTIONS } from '../constants'
import axios from 'axios'

// export const fetchAdoptions = async (): Promise<[]> => {
//     const response = await fetch(
//         'http://localhost:3000/api/read/adoptionposts/all'
//     )
//     const adoptions: [] = await response.json()

//     return adoptions
// }
//

export const fetchAdoptions = (): Action => {
    let adoptions: IAdoption[] = []

    // FIX: 
    adoptions = axios
        .get('http://localhost:3000/api/read/adoptionposts/all')
        .then(response => {
            return response.data
        })

    console.log(adoptions)
    return {
        type: FETCH_ADOPTIONS,
        payload: adoptions
    }
}
