import { NextFetchEvent, NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSession } from '@auth0/nextjs-auth0/edge'
import { getAuth0UserById } from 'utils/dbFetching'
import 'regenerator-runtime'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest, event: NextFetchEvent) {
    const response = NextResponse.next()
    const user = await getSession(request, response)
    const BASE_URL = `https://${process.env.VERCEL_URL}`

    let userId: string = ''
    let userFirstName: string = ''
    let userLastName: string = ''
    let userEmail: string = ''
    let userEmailVerified: boolean = false
    let userPhoto: string = ''

    if (user) {
        const auth0User = await getAuth0UserById(user.user.sub)

        if (!auth0User) return

        userId = user.user.sub
        userFirstName = user.user.given_name
        userLastName = user.user.family_name
        userEmail = auth0User.email
        userEmailVerified = auth0User.email_verified
        userPhoto = user.user.picture
    }

    if (user && userId && userEmail) {
        event.waitUntil(
            fetch(`${BASE_URL}/api/user/`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
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
                method: 'POST'
            })
        )
    }

    NextResponse.redirect('/', request)
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
