import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
import { clerkMiddleware } from '@clerk/nextjs/server';
 
// export async function middleware(request) {
//   return await updateSession(request)
// }

// export default createMiddleware(routing);
 

// export const config = {
//   // Match only internationalized pathnames
//   // matcher: ['/', '/(sl|ru|en)/:path*']
//   matcher: [
//     '/', 
//     '/(sl|ru|en)/:path*',
//     '/((?!_next/static|_next/image|favicon.ico|public).*)'
//   ]
// };

export default clerkMiddleware(async (auth, req) => {
  const i18nMiddleware = createMiddleware(routing);
  const response = await i18nMiddleware(req);

  return response;

})



export const config = {
  matcher: [
    // Match root or locale-prefixed paths only
    '/',
    '/(sl|ru|en|it)/:path*',

    // Match all other paths EXCEPT /sign-in and _next, api, assets etc.
    '/((?!sign-in|api|_next/static|_next/image|images|assets|favicon.ico|auth/confirm|auth/callback|auth/update-password|.*\\.(?:svg|jpg|jpeg|png|gif|ico)$).*)',
  ]
}