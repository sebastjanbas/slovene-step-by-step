import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import createMiddleware from 'next-intl/middleware'

const intlMiddleware = createMiddleware({
  locales: ['en', 'it', 'ru', 'sl'],
  defaultLocale: 'en',
})

const isDashboardRoute = createRouteMatcher(['/(en|it|ru|sl)/d','/d(.*)'])

export default clerkMiddleware(async (auth, request) => {

  if (isDashboardRoute(request)) await auth.protect()

  return intlMiddleware(request)
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}