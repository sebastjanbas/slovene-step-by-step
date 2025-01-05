import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
import { updateSession } from '@/utils/supabase/middleware'
import { redirect } from 'next/dist/server/api-utils';
 
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

export async function middleware(request) {
  // Handle i18n routing
  const i18nMiddleware = createMiddleware(routing);
  const response = await i18nMiddleware(request);
  
  // Handle auth session
  await updateSession(request);
  
  return response;
}

export const config = {
  matcher: [
    '/', 
    '/(sl|ru|en)/:path*',
    '/((?!api|_next/static|_next/image|images|assets|favicon.ico|auth/confirm|auth/callback|.*\\.(?:svg|jpg|jpeg|png|gif|ico)$).*)',
  ]
};