import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';
 
export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'sl', 'ru'],
 
  // Used when no locale matches
  defaultLocale: 'en',

  pathnames: {
    // If all locales use the same pathname, a single
    // external path can be used for all locales
    '/': '/',


    // If locales use different paths, you can
    // specify each external path per locale
    '/about-us': {
      en: '/about-us',
      sl: '/o-nas',
      ru: '/o-нас'
    },
 
    '/products': {
      en: '/products',
      sl: '/produkti',
      ru: '/продукты'
    },
 
    '/features': {
      en: '/features',
      sl: '/izvedite-vec',
      ru:'/функции'
    },
 
    // Also (optional) catch-all segments are supported
    '/log-in': {
      en: '/log-in',
      sl: '/prijava',
      ru: '/регистрация'

    }
  }

});
 
// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);