import Course from "@/components/icons/course";
import Home from "@/components/icons/home";
import Payment from "@/components/icons/payment";
import Settings from "@/components/icons/settings";

export const webNavigation = [
  { name: "pricing", href: "/pricing" },
  // { name: "features", href: "/features" },
  { name: "about-us", href: "/about-us" },

];

export const stats = [
  { id: 1, title: "Happy students", value: "250", symbol: "+" },
  { id: 2, title: "Lessons Conducted", value: "3000", symbol: "h" }, // in hours
  { id: 3, title: "Student Satisfaction", value: "92", symbol: "%" }, // in percent
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
    name: ["Ksenija", "Votiakova"],
    role: "Professional Teacher/Tutor",
    fluentIn: ["Slovene", "Russian", "English"],
    imageUrl: "/foto-ksenja.jpg",
  },
  {
    id: 6,
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
    text: "student-VladLisin",
    stars: [true, true, true, true, true],
  },
  {
    id: 2,
    image:
      "/foto-anna.png",
    name: "Anna Kotelnikova",
    role: "student",
    text: "student-AnnaKotelnikova",
    stars: [true, true, true, true, true],
  },
  {
    id: 3,
    image:
      "/foto-oleksiy.png",
    name: "Oleksiy Molchanov",
    role: "student",
    text: "student-AlexanderMolchanov",
    stars: [true, true, true, true, true],
  },
  {
    id: 4,
    image:
      "/foto-evgenia.png",
    name: "Evgenia Rudakova",
    role: "student",
    text: "student-EvgeniaRudakova",
    stars: [true, true, true, true, true],
  },
  {
    id: 5,
    image:
      "/foto-violeta.png",
    name: "Violeta Lisin",
    role: "student",
    text: "student-VioletaLisin",
    stars: [true, true, true, true, true],
  },
  {
    id: 6,
    image:
      "/foto-oleg.png",
    name: "Oleg Kotelnikov",
    role: "student",
    text: "student-OlegKotelnikov",
    stars: [true, true, true, true, true],
  },
];

export const footerLinks = {
  Personal: [
    { name: "Profile", href: "/settings" },
    { name: "Settings", href: "/settings" },
    { name: "Dashboard", href: "/dashboard" },
  ],
  QuickLinks: [
    { name: "Home", href: "/", server: false },
    { name: "Courses", href: "/courses", server: true },
    { name: "Pricing", href: "/pricing", server: false },
  ],
  Company: [
    { name: "About", href: "/about-us" },
    { name: "Contact us", href: "mailto:sebastjan.bas@gmail.com?cc=almn140803@gmail.com&subject=[Slovene Step By Step] - Support&body=<Enter your message here.>" },
    { name: "FAQ", href: "/pricing#FAQ" },
  ],
  Legal: [
    { name: "Terms of service", href: "/legal/terms-of-service" },
    { name: "Privacy policy", href: "/legal/privacy-policy" },
    { name: "License", href: "/legal/license" },
  ],
};

export const offers = [
  {
      name: 'Duo Plan',
      id: 'tier-duo',
      href: '/dashboard',
      priceMonthly: '€12',
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
      priceMonthly: '€15',
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
      priceMonthly: '€10',
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

export const menuOptions = [
  { name: 'Dashboard', Component: Home, href: '/dashboard' },
  { name: 'Settings', Component: Settings, href: '/settings' },
  { name: 'Courses', Component: Course, href: '/courses'},
  { name: 'Billing', Component: Payment, href: '#' },
]
