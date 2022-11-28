import { Action, IAppContext } from 'app/types'
import { FETCH_ADOPTIONS } from 'app/constants'

export const reducer = (state: IAppContext, action: Action) => {
    switch (action.type) {
        case FETCH_ADOPTIONS:
            return {
                ...state,
                adoptions: [...action.payload]
            }
        default:
            return state
    }
}
