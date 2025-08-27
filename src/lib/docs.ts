
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
  IconUsers,
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
    role: "Executive Developer",
    fluentIn: [""],
    imageUrl: `/foto-me.jpg`,
  },
  {
    id: 3,
    name: ["Sofiya", "Tyutyunnyk"],
    role: "Social Media Manager",
    fluentIn: ["Slovene", "English", "Russian"],
    imageUrl: `/foto-sofia.jpg`,
  },
  {
    id: 4,
    name: ["Manca", "Levašič"],
    role: "Professional Teacher/Tutor",
    fluentIn: ["Slovene", "English"],
    imageUrl: `/foto-manca.png`,
  },
  {
    id: 5,
    name: ["Ela", "Remic"],
    role: "Professional Teacher/Tutor",
    fluentIn: ["Slovene", "Polish", "English"],
    imageUrl: "/foto-ela.jpg",
  },
];

export const reviews = [
  {
    id: 1,
    image:
      "/foto-vlad.png",
    name: "Vlad Lisin",
    role: "student",
    text: "vlad-lisin",
    stars: [true, true, true, true, true],
  },
  {
    id: 2,
    image:
      "/foto-anna.png",
    name: "Anna Kotelnikova",
    role: "student",
    text: "anna-kotelnikova",
    stars: [true, true, true, true, true],
  },
  {
    id: 3,
    image:
      "/foto-oleksiy.png",
    name: "Oleksiy Molchanov",
    role: "student",
    text: "alexander-molchanov",
    stars: [true, true, true, true, true],
  },
  {
    id: 4,
    image:
      "/foto-evgenia.png",
    name: "Evgenia Rudakova",
    role: "student",
    text: "evgenia-rudakova",
    stars: [true, true, true, true, true],
  },
  {
    id: 5,
    image:
      "/foto-violeta.png",
    name: "Violeta Lisin",
    role: "student",
    text: "violeta-lisin",
    stars: [true, true, true, true, true],
  },
  {
    id: 6,
    image:
      "/foto-oleg.png",
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
    { name: "lang-club", href: "/lang-club", server: true },
  ],
  Company: [
    { name: "about", href: "/about-us" },
    { name: "contact", href: "mailto:sebastjan.bas@gmail.com?cc=almn140803@gmail.com&subject=[Slovene Step By Step] - Support&body=<Enter your message here.>" },
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
      name: 'Duo Plan',
      id: 'tier-duo',
      href: '/dashboard',
      priceMonthly: '€12.50',
      description: 'plan1-desc',
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
      name: 'Individual',
      id: 'tier-individual',
      href: 'dashboard',
      priceMonthly: '€16',
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
      name: 'Family Plan',
      id: 'tier-family',
      href: '/dashboard',
      priceMonthly: '€11',
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
]


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
      url: "#",
      icon: IconBrandParsinta,
      disabled: true,
    },
    {
      title: "calendar",
      url: "/calendar",
      icon: IconCalendarWeek,
      disabled: true,
    },
    {
      title: "language-club",
      url: "/language-club",
      icon: IconClubs,
      disabled: false,
    },
    {
      title: "tutors",
      url: "/tutors",
      icon: IconUsers,
      disabled: true,
    },
    {
      title: "dayly-practice",
      url: "#",
      icon: IconFlask,
      disabled: true,
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
      url: "#",
      icon: IconHelp,
      disabled: true,
    },
  ],
  myProgress: [
    {
      name: "my-lessons",
      url: "#",
      icon: IconCalendarCheck,
      disabled: true,
    },
    {
      name: "achievements",
      url: "#",
      icon: IconTrophy,
      disabled: true,
    },
    {
      name: "progress",
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
