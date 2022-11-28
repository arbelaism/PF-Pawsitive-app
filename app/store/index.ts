import { createContext } from 'react'
import { IAppContext } from 'app/types'
import { INITIAL_STATE } from 'app/constants'

const AppContext = createContext<IAppContext>(INITIAL_STATE)

export default AppContext
