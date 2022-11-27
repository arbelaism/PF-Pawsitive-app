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

    axios
        .get('http://localhost:3000/api/read/adoptionposts/all')
        .then(response => {
            adoptions.push(response.data)
        })

    // let response: IAdoption = adoptions[0]

    // FIX: ! type error. se queja porque adoptions[0] se supone que
    // es un tipo IAdoption y realmente es el array que nosotros queremos usar
    // hay que hacer que de acá salga con el tipo correcto.

    return {
        type: FETCH_ADOPTIONS,
        payload: adoptions[0]
    }
}
