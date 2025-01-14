
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
    imageUrl: `https://scontent-sea1-1.cdninstagram.com/v/t39.30808-6/469998661_18248742496263664_5048433504089359441_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE4MDAuc2RyLmYzMDgwOC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=scontent-sea1-1.cdninstagram.com&_nc_cat=104&_nc_ohc=nf7BtEojSJsQ7kNvgEPN1xl&_nc_gid=f581e63a837c46f6be6b9ebe420a0692&edm=APoiHPcAAAAA&ccb=7-5&oh=00_AYDhB82PscfdHqY7KCpwoTGh7YwfpTQIq5PORHSbgxAA9g&oe=678C0B67`,
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
    name: ["Teja", "Šabec"],
    role: "Professional Teacher/Tutor",
    fluentIn: ["Slovene", "Italian", "English"],
    imageUrl: "/placeholder.svg",
  },
];

export const reviews = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1605462863863-10d9e47e15ee?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Vlad Lisin",
    role: "Student",
    text: "I have been studying for about 6 months now, during which time I have improved my level from zdravo (hello) - hvala (thank you), to full-fledged conversations with Slovenians on a regular basis. I would characterize the teachers as a responsible and professional specialists and therefore I highly recommend this program if you want to learn Slovenian.",
    stars: [true, true, true, true, true],
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Anna Kotelnikova",
    role: "Student",
    text: "I am learning Slovenian from scratch. I want to thank my teacher for the individual approach, interesting lessons and good explanations of the material. I recommend it to everyone!",
    stars: [true, true, true, true, true],
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Alexander Molchanov",
    role: "Student",
    text: "The course is great, I've been studying for six months. It really works. Before that I tried to study on my own - it didn't work.",
    stars: [true, true, true, true, true],
  },
];

export const footerLinks = {
  Personal: [
    { name: "Profile", href: "/profile" },
    { name: "Settings", href: "/profile/settings" },
    { name: "Link3", href: "#" },
  ],
  QuickLinks: [
    { name: "Home", href: "/", server: false },
    { name: "Courses", href: "/courses", server: true },
    { name: "Pricing", href: "/pricing", server: false },
  ],
  Company: [
    { name: "About", href: "/about-us" },
    { name: "Contact us", href: "/info/contact-us" },
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
      href: '#',
      priceMonthly: '€12',
      description: "The perfect plan to learn Slovene with a partner, whether a friend, colleague, or family member. Enjoy shared motivation and tailored, interactive lessons.",
      features: [
        "Interactive and engaging sessions",
        "Practice with a friend or family member",
        "Flexible schedule and customized materials",
        "Modern teaching methods.",
      ],
      featured: false,
    },
    {
      name: 'Individual',
      id: 'tier-individual',
      href: '#',
      priceMonthly: '€15',
      description: "The perfect plan if you're just getting started with Slovene. Benefit from interactive sessions and flexible scheduling to fit your busy lifestyle.",
      features: [
        "One-on-one lessons tailored to your goals",
        "+ 1 additional free class",
        "Interactive and engaging sessions",
        "Flexible schedule and customized materials",
        "Modern teaching methods.",
      ],
      featured: true,
    },
    {
      name: 'Family Plan',
      id: 'tier-family',
      href: '#',
      priceMonthly: '€10',
      description: "The perfect plan for small groups, ideal for families or friends. Enjoy collaborative lessons with group activities and shared goals for a fun, effective experience.",
      features: [
        "Fun, collaborative lessons",
        "Interactive and engaging sessions",
        "Practice with a friend or family member",
        "Modern teaching methods.",
        
      ],
      featured: false,
  },
]
