import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
    const path = request.nextUrl.pathname

    // Pass headers for SSR
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-url', request.url)
    requestHeaders.set('x-pathname', path)

    let supabaseResponse = NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key',
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        request.cookies.set(name, value)
                    )
                    supabaseResponse = NextResponse.next({
                        request: {
                            headers: requestHeaders,
                        },
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    const {
        data: { user },
    } = await supabase.auth.getUser()

    // 1. If path is /admin/* -> user must be logged in.
    if (path.startsWith('/admin')) {
        if (!user) {
            // Redirect to the new login location: /login
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }

    // 2. If path is /login and user IS logged in -> redirect to admin
    if (path === '/login' && user) {
        return NextResponse.redirect(new URL('/admin/leads', request.url))
    }

    return supabaseResponse
}
