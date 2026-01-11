import {
  IconBrandParsinta,
  IconCalendar,
  IconCalendarCheck,
  IconCalendarWeek,
  IconClubs,
  IconDashboard,
  IconFlask,
  IconHelp,
  IconProgressCheck,
  IconSettings,
  IconTrophy,
  IconUserCog,
} from "@tabler/icons-react";

export const webNavigation = [
  { name: "pricing", href: "/pricing" },
  // { name: "features", href: "/features" },
  { name: "about", href: "/about-us" },
];

export const stats = [
  { id: 1, title: "happy-students", value: "250", symbol: "+" },
  { id: 2, title: "lessons-conducted", value: "3000", symbol: "h" }, // in hours
  { id: 3, title: "student-satisfaction", value: "92", symbol: "%" }, // in percent
];

export const people = [
  {
    id: 1,
    name: ["Oleksandr", "Tyutyunnyk"],
    role: "CEO / Main Teacher",
    fluentIn: ["Slovene", "English", "Russian"],
    imageUrl: `/foto-oleksandr3.jpg`,
  },
  {
    id: 2,
    name: ["Sebastjan", "Bas"],
    role: "Software Engineer",
    fluentIn: [""],
    imageUrl: `/foto-me.jpg`,
  },
  {
    id: 3,
    name: ["Sofiya", "Tyutyunnyk"],
    role: "Professional Teacher/Tutor",
    fluentIn: ["Slovene", "English", "Russian"],
    imageUrl: `/foto-sofia.jpg`,
  },
  {
    id: 4,
    name: ["Manca", "Levašič"],
    role: "Social Media Manager",
    fluentIn: ["Slovene", "English"],
    imageUrl: `/foto-manca.png`,
  },
  {
    id: 5,
    name: ["Ela", "Remic"],
    role: "Professional Teacher/Tutor",
    fluentIn: ["Slovene", "Russian", "English"],
    imageUrl: "/foto-ela.jpg",
  },
];

export const reviews = [
  {
    id: 1,
    image: "/foto-vlad.png",
    name: "Vlad Lisin",
    role: "student",
    text: "vlad-lisin",
    stars: [true, true, true, true, true],
  },
  {
    id: 2,
    image: "/foto-anna.png",
    name: "Anna Kotelnikova",
    role: "student",
    text: "anna-kotelnikova",
    stars: [true, true, true, true, true],
  },
  {
    id: 3,
    image: "/foto-oleksiy.png",
    name: "Oleksiy Molchanov",
    role: "student",
    text: "alexander-molchanov",
    stars: [true, true, true, true, true],
  },
  {
    id: 4,
    image: "/foto-evgenia.png",
    name: "Evgenia Rudakova",
    role: "student",
    text: "evgenia-rudakova",
    stars: [true, true, true, true, true],
  },
  {
    id: 5,
    image: "/foto-violeta.png",
    name: "Violeta Lisin",
    role: "student",
    text: "violeta-lisin",
    stars: [true, true, true, true, true],
  },
  {
    id: 6,
    image: "/foto-oleg.png",
    name: "Oleg Kotelnikov",
    role: "student",
    text: "oleg-kotelnikov",
    stars: [true, true, true, true, true],
  },
];

export const footerLinks = {
  Personal: [
    { name: "profile", href: "/settings" },
    { name: "settings", href: "/settings" },
    { name: "dashboard", href: "/dashboard" },
  ],
  QuickLinks: [
    { name: "home", href: "/", server: false },
    { name: "pricing", href: "/pricing", server: false },
    { name: "lang-club", href: "/pricing#lang-club", server: true },
  ],
  Company: [
    { name: "about", href: "/about-us" },
    {
      name: "contact",
      href: "mailto:sebastjan.bas@gmail.com?cc=almn140803@gmail.com&subject=[Slovene Step By Step] - Support&body=<Enter your message here.>",
    },
    { name: "faq", href: "/pricing#FAQ" },
  ],
  Legal: [
    { name: "terms-of-service", href: "/legal/terms-of-service" },
    { name: "privacy-policy", href: "/legal/privacy-policy" },
    { name: "license", href: "/legal/license" },
  ],
};

export const offers = [
  {
    name: "Duo Plan",
    id: "tier-duo",
    href: "/dashboard",
    priceMonthly: "€12.50",
    description: "plan1-desc",
    features: [
      "plan1-feature1",
      "plan1-feature2",
      "plan1-feature3",
      "plan1-feature4",
      "plan1-feature5",
      "plan1-feature6",
      "plan1-feature7",
      "plan1-feature8",
      "plan1-feature9",
    ],
    featured: false,
  },
  {
    name: "Individual",
    id: "tier-individual",
    href: "dashboard",
    priceMonthly: "€16",
    description: "plan2-desc",
    features: [
      "plan2-feature1",
      "plan2-feature2",
      "plan2-feature3",
      "plan2-feature4",
      "plan2-feature5",
      "plan2-feature6",
      "plan2-feature7",
      "plan2-feature8",
      "plan2-feature9",
    ],
    featured: true,
  },
  {
    name: "Family Plan",
    id: "tier-family",
    href: "/dashboard",
    priceMonthly: "€11",
    description: "plan3-desc",
    features: [
      "plan3-feature1",
      "plan3-feature2",
      "plan3-feature3",
      "plan3-feature4",
      "plan3-feature5",
      "plan3-feature6",
      "plan3-feature7",
      "plan3-feature8",
      "plan3-feature9",
    ],
    featured: false,
  },
];

export const SidebarNavigationData = {
  navMain: [
    {
      title: "dashboard",
      url: "/dashboard",
      icon: IconDashboard,
      disabled: false,
    },
    {
      title: "courses",
      url: "/courses",
      icon: IconBrandParsinta,
      disabled: false,
    },
    {
      title: "calendar",
      url: "/calendar",
      icon: IconCalendarWeek,
      disabled: false,
    },
    {
      title: "language-club",
      url: "/language-club",
      icon: IconClubs,
      disabled: false,
    },
    {
      title: "daily-practice",
      url: "daily-practice",
      icon: IconFlask,
      disabled: false,
    },
  ],
  navSecondary: [
    {
      title: "settings",
      url: "/settings",
      icon: IconSettings,
      disabled: false,
    },
    {
      title: "get-help",
      url: "mailto:almn140803@gmail.com?cc=sebastjan.bas@gmail.com&subject=[Slovene Step By Step] - Support&body=<Enter your message here.>",
      icon: IconHelp,
      disabled: false,
    },
  ],
  myProgress: [
    {
      title: "my-lessons",
      url: "#",
      icon: IconCalendarCheck,
      disabled: true,
    },
    {
      title: "achievements",
      url: "#",
      icon: IconTrophy,
      disabled: true,
    },
    {
      title: "progress",
      url: "#",
      icon: IconProgressCheck,
      disabled: true,
    },
  ],
  admin: [
    {
      title: "dashboard",
      url: "/admin",
      icon: IconUserCog,
      disabled: false,
    },
    {
      title: "language-club",
      url: "/admin/language-club-admin",
      icon: IconClubs,
      disabled: false,
    },
    {
      title: "bookings",
      url: "/admin/booking",
      icon: IconCalendar,
      disabled: false,
    },
  ],
};

export const languageLevels = [
  {
    value: "A1",
    label: {
      ru: "A1 - Начальный",
      en: "A1 - Beginner",
      it: "A1 - Principiante",
      sl: "A1 - Začetnik",
    },
    description: {
      ru: "Нет предыдущих знаний словенского языка.",
      en: "No prior knowledge of Slovenian.",
      it: "Nessuna conoscenza pregressa di sloveno.",
      sl: "Nič predhodnega znanja slovenščine.",
    },
    icon: "👶🏻",
  },
  {
    value: "A2",
    label: {
      ru: "A2 - Средний",
      en: "A2 - Elementary",
      it: "A2 - Elementare",
      sl: "A2 - Začetnik plus",
    },
    description: {
      ru: "Базовое понимание и простые разговоры.",
      en: "Basic understanding and simple conversations.",
      it: "Comprendere e conversare in modo semplice.",
      sl: "Osnovno razumevanje, preprosti pogovori.",
    },
    icon: "👦🏻",
  },
  {
    value: "B1",
    label: {
      ru: "B1 - Средний",
      en: "B1 - Intermediate",
      it: "B1 - Intermedio",
      sl: "B1 - Srednji nivo",
    },
    description: {
      ru: "Может обрабатывать большинство повседневных разговоров.",
      en: "Can handle most everyday conversations.",
      it: "Capire e conversare in modo fluente.",
      sl: "Dobro razumevanje osnovnih pogovorov.",
    },
    icon: "👨🏻",
  },
  {
    value: "B2",
    label: {
      ru: "B2 - Продвинутый",
      en: "B2 - Advanced",
      it: "B2 - Avanzato",
      sl: "B2 - Visok nivo",
    },
    description: {
      ru: "Хорошее понимание в большинстве разговоров.",
      en: "Good understanding and fluency in specific conversations.",
      it: "Comprendere e conversare in modo fluente.",
      sl: "Dobro razumevanje in uporaba jezika.",
    },
    icon: "🧔🏻‍♂️",
  },
  {
    value: "C1",
    label: {
      ru: "C1 - Мастер",
      en: "C1 - Master",
      it: "C1 - Maestro",
      sl: "C1 - Master",
    },
    description: {
      ru: "Беглое и стильное использование языка.",
      en: "Fluent and sophisticated use of the language.",
      it: "Padroneggiare la lingua in modo fluente e sofisticato.",
      sl: "Odlično razumevanje in uporaba jezika.",
    },
    icon: "🎅🏻",
  },
];

export const tutors = [
  {
    id: 1,
    name: "Ela Remic",
    description: {
      ru: "Русскоязычный преподаватель, опытный с A1-B2",
      en: "Russian-speaking tutor, experienced with A1-B2",
      it: "Insegnante russo, esperto con A1-B2",
      sl: "Rusko govoreči tutor, izkušen s A1-B2",
    },
    avatar: "/foto-ela.jpg",
  },
  {
    id: 2,
    name: "Oleksandr Tyutyunnyk",
    description: {
      ru: "Опытный преподаватель, терпелив к начинающим, высокий уровень знаний",
      en: "Native Russian tutor, Patient with beginners, High level of knowledge",
      it: "Insegnante esperto, paziente con principianti, alto livello di conoscenza",
      sl: "Ruski tutor, Potrpljiv z začetniki, Visok nivo znanja",
    },
    avatar: "/foto-oleksandr3.jpg",
  },
  {
    id: 3,
    name: "Manca Levašič",
    description: {
      ru: "Родной язык",
      en: "Russian-speaking tutor",
      it: "Insegnante russo",
      sl: "Rusko govoreči tutor",
    },
    avatar: "/foto-manca.png",
  },
];

export const learningGoals = [
  {
    value: "travel",
    label: {
      ru: "Путешествия и туризм",
      en: "Travel & Tourism",
      it: "Viaggi & Turismo",
      sl: "Potovanje in Turizem",
    },
    description: {
      ru: "Планируете поездку в Словению?",
      en: "Planning a trip to Slovenia?",
      it: "Pianificando un viaggio in Slovenia?",
      sl: "Planirate potovanje v Slovenijo?",
    },
    icon: "✈️",
  },
  {
    value: "work",
    label: {
      ru: "Работа и карьера",
      en: "Work & Career",
      it: "Lavoro & Carriera",
      sl: "Delo in Kariera",
    },
    description: {
      ru: "Хотите улучшить свои шансы на трудоустройство?",
      en: "Looking to improve your job prospects?",
      it: "Vuoi migliorare le tue opportunità di lavoro?",
      sl: "Želite izboljšati svoje zaposlitvene možnosti?",
    },
    icon: "💼",
  },
  {
    value: "relocation",
    label: {
      ru: "Переезд и интеграция",
      en: "Relocation & Integration",
      it: "Trasferimento & Integrazione",
      sl: "Prehod in Integracija",
    },
    description: {
      ru: "Хотите переехать в Словению?",
      en: "Moving to Slovenia?",
      it: "Trasferimento in Slovenia?",
      sl: "Se želite preseliti v Slovenijo?",
    },
    icon: "🏠",
  },
  {
    value: "academic",
    label: {
      ru: "Образование и личный рост",
      en: "Education & Personal Growth",
      it: "Istruzione & Crescita Personale",
      sl: "Izobraževanje in Osebna Rast",
    },
    description: {
      ru: "Хотите улучшить свои навыки для личных или академических целей?",
      en: "Want to improve your skills for personal or academic purposes?",
      it: "Vuoi migliorare le tue abilità per scopi personali o accademici?",
      sl: "Želite izboljšati svoje sposobnosti za osebne ali akademske namene?",
    },
    icon: "🎓",
  },
  {
    value: "fun",
    label: {
      ru: "Развлечения и развлечения",
      en: "Fun & Entertainment",
      it: "Divertimento & Intrattenimento",
      sl: "Zabava",
    },
    description: {
      ru: "Хотите улучшить свои навыки для развлечений или развлечений?",
      en: "Want to improve your skills for fun or entertainment?",
      it: "Vuoi migliorare le tue abilità per divertimento o intrattenimento?",
      sl: "Želite izboljšati svoje sposobnosti za zabavo?",
    },
    icon: "🎮",
  },
  {
    value: "family",
    label: {
      ru: "Семья и отношения",
      en: "Family & Relationships",
      it: "Famiglia & Relazioni",
      sl: "Družina in Odnosi",
    },
    description: {
      ru: "Хотите улучшить свои навыки для семьи или личных отношений?",
      en: "Want to improve your skills for family or personal relationships?",
      it: "Vuoi migliorare le tue abilità per famiglia o relazioni personali?",
      sl: "Želite izboljšati svoje znanje za družinske ali osebne odnose?",
    },
    icon: "🤍",
  },
];

export const scheduleOptions = [
  {
    value: "morning",
    label: {
      en: "Morning",
      ru: "Утро",
      it: "Mattina",
      sl: "Zjutraj",
    },
    time: "8:00 - 12:00",
    icon: "🌞",
  },
  {
    value: "afternoon",
    label: {
      en: "Afternoon",
      ru: "Полдень",
      it: "Pomeriggio",
      sl: "Popoldne",
    },
    time: "12:00 - 17:00",
    icon: "🌆",
  },
  {
    value: "evening",
    label: {
      en: "Evening",
      ru: "Вечер",
      it: "Sera",
      sl: "Večer",
    },
    time: "17:00 - 22:00",
    icon: "🌃",
  },
  {
    value: "flexible",
    label: {
      en: "Flexible",
      ru: "Гибкий",
      it: "Flessibile",
      sl: "Flexibilen",
    },
    time: {
      en: "Anytime",
      ru: "В любое время",
      it: "In qualsiasi momento",
      sl: "Kadarkoli",
    },
    icon: "🕒",
  },
];
