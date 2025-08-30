import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';
 
export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'sl', 'ru', 'it'],
 
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
      ru: '/o-нас',
      it: '/chi-siamo'
    },
 
    '/courses': {
      en: '/courses',
      sl: '/tecaji',
      ru: '/продукты',
      it: '/corsi'
    },
 
    '/features': {
      en: '/features',
      sl: '/izvedite-vec',
      ru:'/функции',
      it: '/caratteristiche'
    },

    '/pricing': {
      en: '/pricing',
      sl: '/cena',
      ru: '/ценообразование',
      it: '/prezzi'
    },
    
    '/info/contact-us': {
      en: '/info/contact-us',
      sl: '/info/kontakti',
      ru: '/info/kontakti',
      it: '/info/contattaci'
    },

    '/legal/terms-of-service': {
      en: '/legal/terms-of-service',
      sl: '/pravne/pogoji',
      ru: '/legal/terms-of-service',
      it: '/legale/termini-di-servizio'
    },

    '/legal/privacy-policy': {
      en: '/legal/privacy-policy',
      sl: '/pravne/zasebnost',
      ru: '/legal/privacy-policy',
      it: '/legale/informativa-sulla-privacy'
    },

    '/legal/license': {
      en: '/legal/license',
      sl: '/pravne/licenca',
      ru: '/legal/license',
      it: '/legale/licenza'
    },

    '/settings' : {
      en: '/settings',
      sl: '/nastavitve',
      ru: '/настройки',
      it: '/impostazioni'
    },
    '/dashboard': {
      en: '/dashboard',
      sl: '/dashboard',
      ru: '/dashboard',
      it: '/dashboard'
    },
    "/admin": {
      en: '/admin',
      sl: '/admin',
      ru: '/admin',
      it: '/admin'
    },
    "/admin/language-club-admin": {
      en: '/admin/language-club-admin',
      sl: '/admin/pogovorni-klub-admin',
      ru: '/admin/языковой-клуб-admin',
      it: '/admin/club-linguistico-admin'
    },
    "/language-club": {
      en: '/language-club',
      sl: '/pogovorni-klub',
      ru: '/языковой-клуб',
      it: '/club-linguistico'
    },
    "/tutors": {
      en: '/tutors',
      sl: '/mentorji',
      ru: '/учителя',
      it: '/tutori'
    },
    "/welcome": {
      en: '/welcome',
      sl: '/dobrodosli',
      ru: '/добро-пожаловать',
      it: '/benvenuto'
    }
  },

});
 
// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);