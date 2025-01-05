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
 
    '/courses': {
      en: '/courses',
      sl: '/tecaji',
      ru: '/продукты'
    },
 
    '/features': {
      en: '/features',
      sl: '/izvedite-vec',
      ru:'/функции'
    },

    '/pricing': {
      en: '/pricing',
      sl: '/cena',
      ru: '/ценообразование',
    },

    '/info/faq': {
      en: '/info/faq',
      sl: '/info/vprasanja',
      ru: '/info/vprasanja',
    },
    
    '/info/contact-us': {
      en: '/info/contact-us',
      sl: '/info/kontakti',
      ru: '/info/kontakti',
    },

    '/legal/terms-of-service': {
      en: '/legal/terms-of-service',
      sl: '/pravne/pogoji',
      ru: '/legal/terms-of-service',
    },

    '/legal/privacy-policy': {
      en: '/legal/privacy-policy',
      sl: '/pravne/zasebnost',
      ru: '/legal/privacy-policy',
    },

    '/legal/license': {
      en: '/legal/license',
      sl: '/pravne/licenca',
      ru: '/legal/license',
    },

    '/profile/settings' : {
      en: '/profile/settings',
      sl: '/profil/nastavitve',
      ru: '/profile/настройки',
    },

    '/profile' : {
      en: '/profile',
      sl: '/profil',
      ru: '/profile',
    },
 
    // Also (optional) catch-all segments are supported
    '/auth/login': {
      en: '/auth/login',
      sl: '/auth/prijava',
      ru: '/auth/регистрация'

    },
  }

});
 
// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);