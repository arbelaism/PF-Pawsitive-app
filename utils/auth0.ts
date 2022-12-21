import { initAuth0 } from '@auth0/nextjs-auth0'

export default initAuth0({
    secret: process.env.AUTH0_SECRET,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
    baseURL: 'https://pf-pawsitive-app-git-develop-arbelais.vercel.app/',
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET
})
