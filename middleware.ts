import { NextFetchEvent, NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSession } from '@auth0/nextjs-auth0/edge'
import 'regenerator-runtime'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest, event: NextFetchEvent) {
    const response = NextResponse.next()
    const user = await getSession(request, response)
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

    let userId: string = ''
    let userFirstName: string = ''
    let userLastName: string = ''
    let userEmail: string = ''
    let userEmailVerified: boolean = false
    let userPhoto: string = ''

    if (user) {
        const res = await fetch(`${BASE_URL}/api/auth/users/${user.user.sub}`)
        const auth0User = await res.json()

        if (!auth0User) return

        userId = user.user.sub
        userFirstName = user.user.given_name
        userLastName = user.user.family_name
        userEmail = auth0User.email
        userEmailVerified = auth0User.email_verified
        userPhoto = user.user.picture
    }

    // if (user && userId && userEmail) {
    //     event.waitUntil(
    //         fetch(`${BASE_URL}/api/user/`, {
    //             method: 'POST',
    //             headers: {
    //                 Accept: 'application/json',
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({
    //                 id: userId,
    //                 firstName: userFirstName || '',
    //                 lastName: userLastName || '',
    //                 email: userEmail,
    //                 email_verified: userEmailVerified,
    //                 photo: userPhoto
    //             })
    //         })
    //     )

    //     event.waitUntil(
    //         fetch(`${BASE_URL}/api/bookmarks/${userId}`, {
    //             method: 'POST'
    //         })
    //     )
    // }
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
