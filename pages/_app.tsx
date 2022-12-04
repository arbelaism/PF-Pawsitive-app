import type { AppProps } from 'next/app'
import 'styles/globals.css'
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { UserProvider } from '@auth0/nextjs-auth0/client'

function MyApp({ Component, pageProps }: AppProps) {
    const queryClient = new QueryClient()

    return (
        <UserProvider>
            <QueryClientProvider client={queryClient}>
                <Component {...pageProps} />
                <ReactQueryDevtools />
            </QueryClientProvider>
        </UserProvider>
    )
}

export default MyApp
