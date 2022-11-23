import type { AppProps } from 'next/app';
import {Auth0Provider} from '@auth0/auth0-react'; 
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (<Auth0Provider 
            domain='dev-da1yc0rjs8j70lg0.us.auth0.com' 
            clientId='KgyRDNtn6UdwHK7ty1cYLqV4qTMb4sf8' 
            redirectUri={window.location.origin}
            >
              <Component {...pageProps} />
          </Auth0Provider>
          )
}

export default MyApp
