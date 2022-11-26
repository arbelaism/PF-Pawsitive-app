import { Action, IAppContext } from '../../types'
import { FETCH_ADOPTIONS } from '../constants'

export const reducer = (state: IAppContext, action: Action) => {
    switch (action.type) {
        case FETCH_ADOPTIONS:
            return {
                ...state,
                adoptions: action.payload
            }
        default:
            return state
    }
}
