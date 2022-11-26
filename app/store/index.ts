import { createContext } from 'react'
import { IAppContext } from '../../types/index'
import { INITIAL_STATE } from '../constants'

const AppContext = createContext<IAppContext>(INITIAL_STATE)

export default AppContext
