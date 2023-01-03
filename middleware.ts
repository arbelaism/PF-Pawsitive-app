import { NextFetchEvent, NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { initAuth0 } from '@auth0/nextjs-auth0/edge'
import { fetchUserById, getAuth0UserById } from 'utils/dbFetching'
import 'regenerator-runtime'

const auth0 = initAuth0({
    secret: process.env.AUTH0_SECRET,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
    baseURL: process.env.AUTH0_BASE_URL,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET
})

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest, event: NextFetchEvent) {
    const { pathname } = request.nextUrl
    const response = NextResponse.next()
    const user = await auth0.getSession(request, response)
    const BASE_URL = process.env.AUTH0_BASE_URL

    if (pathname.startsWith('/_next')) {
        return NextResponse.next()
    }

    let userId: string = ''
    let userFirstName: string = ''
    let userLastName: string = ''
    let userEmail: string = ''
    let userEmailVerified: boolean = false
    let userPhoto: string = ''
    let userLogins: number = 0

    if (user) {
        const auth0User = await getAuth0UserById(user.user.sub)

        if (!auth0User) return

        userId = user.user.sub
        userFirstName = user.user.given_name
        userLastName = user.user.family_name
        userEmail = auth0User.email
        userEmailVerified = auth0User.email_verified
        userPhoto = user.user.picture
        userLogins = auth0User.logins_count

        const dbUser = await fetchUserById(user.user.sub)

        if (dbUser) {
            if (userId && userEmail) {
                event.waitUntil(
                    fetch(`${BASE_URL}/api/user/`, {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                        referrerPolicy: 'strict-origin-when-cross-origin',
                        body: JSON.stringify({
                            id: user.user.sub,
                            firstName: userFirstName || '',
                            lastName: userLastName || '',
                            email: userEmail,
                            email_verified: userEmailVerified,
                        })
                    })
                )
                event.waitUntil(
                    fetch(`${BASE_URL}/api/bookmarks/${userId}`, {
                        method: 'POST',
                        referrerPolicy: 'strict-origin-when-cross-origin'
                    })
                )
            }
            return NextResponse.next()
        }

        if (userLogins === 1) {
            if (user && userId && userEmail) {
                event.waitUntil(
                    fetch(`${BASE_URL}/api/user/`, {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                        referrerPolicy: 'strict-origin-when-cross-origin',
                        body: JSON.stringify({
                            id: userId,
                            firstName: userFirstName || '',
                            lastName: userLastName || '',
                            email: userEmail,
                            email_verified: userEmailVerified,
                            photo: userPhoto
                        })
                    })
                )

                event.waitUntil(
                    fetch(`${BASE_URL}/api/bookmarks/${userId}`, {
                        method: 'POST',
                        referrerPolicy: 'strict-origin-when-cross-origin'
                    })
                )
            }

            userLogins++
            return NextResponse.redirect(
                new URL('/profile/welcome', request.url)
            )
        }
    }
    NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|favicon.ico).*)'
    ]
}
