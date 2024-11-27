import HelperPage from "@/components/about/HelperPage";

const people = [
    {
        id: 1,
        name: ["Oleksandr", "Tyutyunnyk"],
        role: "CEO / Main Teacher",
        fluentIn: ["Slovene", "English", "Russian"],
        imageUrl:
            "https://generalseba.github.io/slovene-step-by-step/foto-oleksandr3.jpg",
        description: `My name is Oleksandr, and I have been living in Slovenia for over 10 years. 
        I completed both school and high school entirely in Slovenian, and I am currently a student at the University of Ljubljana.
        Over the years of living and studying in a Slovenian-speaking environment, I have gained extensive experience in the practical use of the language, spelling, and, most importantly, in everyday conversational Slovenian.
        My experience as a tutor has helped me develop effective teaching methods tailored to the individual needs of each student. 
        I strive to create a comfortable atmosphere in my lessons, which enhances motivation and ensures maximum learning effectiveness.
        Thanks to my experience living and studying in Slovenia, I offer personalized lessons that cover both everyday conversational situations and exam preparation. My goal is to help you not only master the language but also feel confident when communicating. 
        Let's work together to overcome language barriers and achieve your language goals!
        `,
    },
    {
        id: 2,
        name: ["Manca", "Levašič"],
        role: "Professional Teacher",
        fluentIn: ["Slovene", "English"],
        imageUrl: "https://placehold.co/600x600",
        description: `My name is Manca, and I specialize in teaching Slovenian as a language instructor. 
        For me, it's important not only to share knowledge but also to help students confidently use the language in real-life situations.
        My lessons are always focused on practice. Together, we develop conversational skills, explore grammar through engaging examples, and actively train listening comprehension. I strive to make classes as interactive and enjoyable as possible so that students can immediately apply what they've learned in practical settings.
        I believe that the key to language learning is confidence and motivation, which is why my lessons are conducted in a friendly and supportive atmosphere where everyone feels at ease. Together, we uncover the unique aspects of the Slovenian language and culture, making learning both useful and inspiring.
        `
    },
    {
        id: 3,
        name: ["Teja", "Šabec"],
        role: "Professional Teacher",
        fluentIn: ["Slovene", "English"],
        imageUrl: "https://placehold.co/600x600",
        description: `My name is Tea, and I love sharing the beauty and uniqueness of the Slovenian language with others. 
        Teaching it is my profession, but my passion for languages goes far beyond just one. 
        During my studies at the University of Ljubljana, I also learned Russian and Italian, which helps me better understand the challenges of learning a new language.
        In my lessons, I strive to create a friendly and comfortable atmosphere. 
        I always take into account the interests and goals of each student, ensuring that the classes are not only practical but also engaging. 
        Together, we explore the intricacies of the language, discuss fascinating topics, and practice real-life communication. 
        For me, teaching is more than just a job — it’s a way to share culture, connect with people from all walks of life, and help them discover Slovenia.
        `
    },
];

const link = "https://generalseba.github.io/slovene-step-by-step";

export default function MeetTheTeamPage() {
    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="max-w-xl mb-10">
                    <h2 className="text-pretty text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
                        Meet our Team
                    </h2>
                    <p className="mt-6 text-lg/8 text-gray-600">
                        We're a dynamic group of individuals who are passionate about what
                        we do and dedicated to delivering the best results for our clients.
                    </p>
                </div>
                <HelperPage people={people} link={link} />
            </div>
        </div>
    );
}
