import type { AppProps } from 'next/app'
import '../styles/globals.css'
import AppContext from '../app/store'
import { useContext, useReducer } from 'react'
import { reducer } from '../app/reducer'

function MyApp({ Component, pageProps }: AppProps) {
    const context = useContext(AppContext)
    const [state, dispatch] = useReducer(reducer, context)

    return (
        <AppContext.Provider value={state}>
            <Component {...pageProps} />
        </AppContext.Provider>
    )
}

export default MyApp
